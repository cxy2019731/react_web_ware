import { useEffect, useRef } from "react";
/**
 * 定时器hook
 * @param {function} callback 回调方法
 * @param {number} delay 间隔时间 单位:ms 默认=1000
 */
function useInterval(callback, delay = 1000) {
  const savedCallback = useRef();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      // 立即执行一次
      savedCallback.current();
    }
    if (delay !== null) {
      // 绑定定时器
      let id = setInterval(tick, delay);
      //   清除副作用
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default useInterval;
