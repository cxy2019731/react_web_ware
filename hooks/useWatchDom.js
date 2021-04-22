import { useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
/**
 * 获取节点最真实的dom部分
 * @param {any} target 需要处理的节点
 * @param {any} defaultElement 默认节点 ?
 * @returns element
 */
function getTargetElement(target, defaultElement) {
    if (!target) {
        return defaultElement;
    }

    var targetElement;

    if (typeof target === 'function') {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}
/**
 * 监听dom属性的变化,根据自定义的方法获取指定属性
 * @param {element} target dom节点 | ref | get dom element function
 * @param {function} customDomCallBack 返回属性对象
 * @returns object
 */
function useWatchDom(target, customDomCallBack) {
    const [state, setState] = useState(() => {
        const elm = getTargetElement(target) || null;
        const callBackData = elm ? customDomCallBack(elm) : {};
        return {
            ...callBackData,
        };
    });

    useLayoutEffect(() => {
        const elm = getTargetElement(target) || null;

        if (!elm) {
            return () => {};
        }

        const resizeObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                setState({
                    ...(entry.target ? customDomCallBack(entry.target) : {}),
                });
            });
        });
        resizeObserver.observe(elm);
        return function () {
            resizeObserver.disconnect();
        };
    }, [target]);

    return state;
}

export default useWatchDom;

/**
使用示例-获取元素的高宽
const domRect = useWatchDom(domRef, elm => ({
    width: elm.clientWidth || 0,
    height: elm.clientHeight || 0,
}));
console.log(domRect); // {width:xx,height:xx}

 */
