/*
 * @Author: itmanyong
 * @Date: 2021-04-08 13:48:22
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 14:02:09
 * @FilePath: \react-vite2-template\src\router\index.jsx
 */

import { memo } from 'react';
import { HashRouter, useRoutes } from 'react-router-dom';
import routes from '@/router/routeComponents';
/**
 * 路由集合
 */
const Elements = memo(() =>
	useRoutes([
		{
			path: '/',
			element: <routes.layout />,
			children: [
				{
					path: 'home',
					element: <routes.home />,
				},
				{
					path: '*',
					element: <routes.notFount />,
				},
			],
		},
		{
			path: '/initialize',
			element: <routes.initialize />,
		},
		{
			path: '/login',
			element: <routes.login />,
		},
		{
			path: '*',
			element: <routes.notFount />,
		},
	]),
);
/**
 * 路由组件(此处Routes中的内容必须写为组件形式,否则报错)
 */
function Router() {
	return (
		<HashRouter basename='/'>
			<routes.app>
				<Elements />
			</routes.app>
		</HashRouter>
	);
}
export default Router;
