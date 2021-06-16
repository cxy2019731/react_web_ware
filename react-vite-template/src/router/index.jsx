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
import {
	_ROUTER_DEFAULT,
	_ROUTER_INITIALIZE,
	_ROUTER_HOME,
	_ROUTER_LOGIN,
	_ROUTER_IFRAME,
	_ROUTER_USER,
	_ROUTER_ROLE,
	_ROUTER_DICT,
	_ROUTER_MENU,
	_ROUTER_AUTH,
	_ROUTER_DEPARTMENT,
	_ROUTER_TREE,
} from '@constant';
/**
 * 路由集合
 */
const Elements = memo(() =>
	useRoutes([
		{
			path: _ROUTER_DEFAULT,
			element: <routes.Layout />,
			children: [
				{
					path: _ROUTER_HOME,
					element: <routes.Home />,
				},
				{
					path: _ROUTER_USER,
					element: <routes.User />,
				},
				{
					path: _ROUTER_ROLE,
					element: <routes.Role />,
				},
				{
					path: _ROUTER_DICT,
					element: <routes.Dict />,
				},
				{
					path: _ROUTER_MENU,
					element: <routes.Menu />,
				},
				{
					path: _ROUTER_AUTH,
					element: <routes.Auth />,
				},
				{
					path: _ROUTER_DEPARTMENT,
					element: <routes.Department />,
				},
				{
					path: `${_ROUTER_IFRAME}*`,
					element: <routes.Iframe />,
				},
				{
					path:_ROUTER_TREE,
					element:<routes.Tree />
				},
				{
					path: '*',
					element: <routes.NotFount />,
				},
			],
		},
		{
			path: `/${_ROUTER_INITIALIZE}`,
			element: <routes.Initialize />,
		},
		{
			path: `/${_ROUTER_LOGIN}`,
			element: <routes.Login />,
		},
		{
			path: '*',
			element: <routes.NotFount />,
		},
	]),
);
/**
 * 路由组件(此处Routes中的内容必须写为组件形式,否则报错)
 */
function Router() {
	return (
		<HashRouter basename='/'>
			<routes.App>
				<Elements />
			</routes.App>
		</HashRouter>
	);
}
export default Router;
