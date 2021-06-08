import './init';
import { render } from 'react-dom';
import Router from './router/index';
import '@/styles/index.css';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

render(
	<ConfigProvider locale={zhCN}>
		<Router />
	</ConfigProvider>,
	document.getElementById('root'),
);
