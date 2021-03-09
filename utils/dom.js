/**
 * 获取指定dom节点的指定css属性
 * @param {element} elem dom节点 ref需要传入ref.current
 * @param {string} prop 属性名
 * @returns number | string
 */
export function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    return elem.currentStyle[prop];
  }
}
