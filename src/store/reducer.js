// 创建初始状态，并导出
const defaultState = {
    apiDomain:'http://localhost:4321', //后端api域名
}

//导出
export default function Reducer(state = defaultState, action){
    let newState = JSON.parse(JSON.stringify(state)); // 深拷贝
    switch(action.type){
        case "updateApiDomain":// 修改后端api域名,局域网内ip+port
            newState.apiDomain = action.apiDomain;
            break;
        default:
            break;
    }
    return newState;
}