// 仓库入口文件
import reducer from "./reducer";

import { createStore } from "redux";

// 创建仓库
const store = createStore(reducer);

//导出
export default store;