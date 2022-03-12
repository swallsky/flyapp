/**
 * 前导补充 左补
 * @param {*} num 
 * @param {*} len 
 * @returns 
 */
function strPadLeft(num, len, pad) {
    return (Array(len).join(pad) + num).slice(-len);
}


module.exports = {
    strPadLeft
}