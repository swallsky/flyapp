import axios from "axios";

const request = {
  // 缓存baseURL
  baseURL: "",
  /**
   * 服务端remote url
   * @returns
   */
  getRemoteURL: async () => {
    if (request.baseURL === "") { //防止重复读取，提高性能
      let ip = await window.electronApi.getLocalIP();
      request.baseURL = "http://" + ip+":4321";
      return request.baseURL;
    } else {
      return request.baseURL;
    }
  },
  /**
   * get数据，本地服务
   * @param {*} path 服务path
   * @returns
   */
  get: async (path) => {
    let url = await request.getRemoteURL();
    return await axios.request({
      url: path,
      method: "get",
      baseURL: url,
    });
  },
  /**
   * post提交
   * @param {*} path 服务path
   * @param {*} data 提交数据
   * @returns
   */
  post: async (path, data) => {
    let url = await request.getRemoteURL();
    return await axios.request({
      url: path,
      method: "post",
      baseURL: url,
      data: data,
    });
  },
};

export default request;
