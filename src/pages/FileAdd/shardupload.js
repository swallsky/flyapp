/**
 * 单个文件分片上传
 */
import axios from "axios";
// 文件加密处理
import SparkMD5 from "spark-md5";
// 每个chunk的大小，设置为1M
const chunkSize = 1 * 1024 * 1024;
// 开启分片上传
const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

const domain = "http://localhost:8888";

// 支持跨域请求
axios.defaults.withCredentials = false;

/**
 * 对文件进行MD5加密(文件内容+文件标题形式)
 * @param {*} file 
 * @returns 
 */
const hashFile = (file) => {
    return new Promise((resolve, reject) => {
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      function loadNext() {
        const start = currentChunk * chunkSize;
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      fileReader.onload = e => {
        spark.append(e.target.result); // Append array buffer
        currentChunk += 1;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          console.log('finished loading');
          const result = spark.end();
          // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
          // 想保留两个文件无法保留。所以把文件名称加上。
          const sparkMd5 = new SparkMD5();
          sparkMd5.append(result);
          sparkMd5.append(file.name);
          const hexHash = sparkMd5.end();
          resolve(hexHash);
        }
      };
      fileReader.onerror = () => {
        console.warn('文件读取失败！');
      };
      loadNext();
    }).catch(err => {
      console.log(err);
    });
  }

const uploadFile = (
    file, //文件
    hash, //加密hash算法
    blockCount = 0, // 分片总数
    nowUploadNums=0, //当前分片序号
    axiosPromiseArray = [] //分片合并请求
    ) => {
    const start = nowUploadNums * chunkSize; // 当前分片开始
    const end = Math.min(file.size, start + chunkSize); //分片结束位置
    // 构建表单
    const form = new FormData();
    form.append('file', blobSlice.call(file, start, end));
    form.append('index', nowUploadNums);
    form.append('hash', hash);
    // ajax提交 分片，此时 content-type 为 multipart/form-data
    const axiosOptions = {
      onUploadProgress: e => {
        nowUploadNums++;
        // 判断分片是否上传完成
        if (nowUploadNums < blockCount) {
        //   setPrecent(nowUploadNums, blockCount);
          uploadFile(file,hash,nowUploadNums,blockCount,axiosPromiseArray); //递归执行分片操作
        } else {
          // 4.所有分片上传后，请求合并分片文件
          axios.all(axiosPromiseArray).then(() => {
            // setPrecent(blockCount, blockCount); // 全部上传完成
            axios.post(domain+'/file/merge_chunks', {
              name: file.name,
              total: blockCount,
              hash
            }).then(res => {
              console.log(res.data, file);
              alert('上传成功');
            }).catch(err => {
              console.log(err);
            });
          });
        }
      },
    };
    // 加入到 Promise 数组中
    axiosPromiseArray.push(axios.post(domain+'/file/upload', form, axiosOptions));
}


export default async function ShardUpload(file){
    let hash = await hashFile(file); //文件 hash 
    let blockCount = Math.ceil(file.size / chunkSize); // 分片总数
    uploadFile(file,hash,blockCount); //分片上传中
}
