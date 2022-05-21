/**
 * 集成常用的选择器，方便RPA操作，支持链式操作
 */
function Selector(ele) {
  this.dom = document.querySelector(ele); //清空原有的
}
/**
 * 给对应的input填充数据
 * @param {*} ele
 * @param {*} val
 */
function _fillInput(ele, val) {
  let evt = new InputEvent("input", {
    inputType: "insertText",
    data: val,
    dataTransfer: null,
    isComposing: false,
    bubbles: true, //由于部分系统采用react等虚拟dom，需要开启此参数
  });
  if (ele) {
    ele.value = val;
    ele.dispatchEvent(evt);
  } else {
    throw Error("fill input not found element");
  }
}

Selector.prototype = {
  // 获取dom元素
  getDom: function () {
    return this.dom;
  },
  // 点击事件
  click: function () {
    if (this.dom) {
      this.dom.click(); //点击
    } else {
      throw Error("click not found element");
    }
  },
  /**
   * 给当前dom元素 单个
   * @param {*} val
   * @returns this
   */
  val: function (val) {
    _fillInput(this.dom, val);
    return this;
  },
  /**
   * 同时写入多个值
   * @param {*} vals
   * @returns this
   */
  vals: function (vals) {
    let adom = this.dom;
    for (let i = 0; i < adom.length; i++) {
      _fillInput(adom[i], vals[i]);
    }
    return this;
  },
};

module.exports = function (ele) {
  return new Selector(ele);
};
