import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
// 加载全局配置
function App(props) {
  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
}

export default App;
