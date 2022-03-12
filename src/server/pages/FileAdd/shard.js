import axios from "axios";

// 每个chunk的大小，设置为512k
const chunkSize = 1 * 1024 * 512;

/**
 * 分片上传
 * @param {*} file blob文件
 * @param {*} si 分片序号
 * @param {*} tsi 总分片数
 */
async function shardRes(file, si = 0, tsi) {

    const [filename, ext] = file.name.split('.');
    let start = si * chunkSize;
    if (si < tsi) { //执行分片操作
        const blob = file.slice(start, start + chunkSize); //分片成blob
        const blobName = `${filename}${si}${ext}`;
        const blobFile = new File([blob], blobName); //将blob转换为文件

        const formData = new FormData();
        formData.append('file', blobFile);
        formData.append('fi', si); // 当前分片序号
        formData.append('ftotal', tsi); // 总分片数
        axios.post('/api/upload/upload', formData).then(res => {
            si++;
            shardRes(file, si, tsi); // 递归上传
            console.log('上传成功');
        }).catch(err => {
            console.log(err);
        });
    } else {
        axios.post('/api/upload/merge_chunks', { filename: file.name }).then(res => {
            console.log('上传成功');
        }).catch(err => {
            console.log(err);
        });
        return;
    }
}

export default async function Shard(file) {
    let blockCount = Math.ceil(file.size / chunkSize); // 分片总数
    await shardRes(file, 0, blockCount);
}