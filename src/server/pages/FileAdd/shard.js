import axios from "axios";

// 每个chunk的大小，设置为1M
const chunkSize = 2 * 1024 * 1024;
// const chunkSize = 1 * 1024 ;

/**
 * 分片上传
 * @param {*} file blob文件
 * @param {*} nfilename 新的文件名
 * @param {*} si 分片序号
 * @param {*} tsi 总分片数
 * @param {*} fsn 文件序号
 * @param {*} setPrecent 百分比
 */
async function shardRes(apiDomain, file, nfilename, si = 0, tsi, fsn, setPrecent) {
    let start = si * chunkSize;
    if (si < tsi) { //执行分片操作
        const blob = file.slice(start, start + chunkSize); //分片成blob
        const blobName = `${nfilename}${si}.part`; //blob文件名
        const blobFile = new File([blob], blobName); //将blob转换为文件

        const formData = new FormData();
        formData.append('file', blobFile);
        formData.append('filename', nfilename); //当前文件名
        formData.append('fi', si); // 当前分片序号
        formData.append('ftotal', tsi); // 总分片数
        // 启用同步代码，防止发生异步并发顺序错乱问题
        await axios.post(apiDomain + '/api/upload/upload', formData);
        // console.log('切片' + si + '上传成功');
        si++;
        setPrecent(fsn, nfilename, si, tsi); //更新进度
        shardRes(apiDomain, file, nfilename, si, tsi, fsn, setPrecent); // 递归上传
    } else {
        // 合并切片
        await axios.post(apiDomain + '/api/upload/merge_chunks', { filename: nfilename });
        // console.log('切片合并完成');
        setPrecent(fsn, nfilename, si, tsi); //更新进度
        return;
    }
}

/**
 * 返回文件名+时间的文件名称，防止文件名称冲突
 * @param {*} file 
 */
function getTimeFileName(file) {
    let oldname = file.name;
    let filename = oldname.substring(0, oldname.lastIndexOf(".")); //获取文件名
    let ext = oldname.substring(oldname.lastIndexOf(".")); //获取.后缀名

    let timesp = Math.floor(Date.now() / 1000); //当前时间戳
    let date = new Date(timesp * 1000);
    let ymdhis = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
    return `${filename}-${ymdhis}${ext}`;
}

/**
 * 文件上传
 * @param {*} apiDomain api域名
 * @param {*} fsn 文件序号
 * @param {*} file 需要上传的文件
 * @param {*} setPrecent 进度
 */
export default async function Shard(apiDomain, fsn, file, setPrecent) {
    let nfilename = getTimeFileName(file); //新的文件名
    let blockCount = Math.ceil(file.size / chunkSize); // 分片总数
    await shardRes(apiDomain, file, nfilename, 0, blockCount, fsn, setPrecent);
}