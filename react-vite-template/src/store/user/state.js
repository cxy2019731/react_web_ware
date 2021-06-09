/*
 * @Author: itmanyong
 * @Date: 2021-05-31 11:40:34
 * @Last Modified by: itmanyong
 * @Last Modified time: 2021-06-10 01:47:07
 */
import { v4 as uuidV4 } from 'uuid';
const state = {
	// token
	token: '',
	// 登录与否
	isLogin: false,
	// 用户数据
	info: {},
	// 用户角色
	roles: [],
	// 用户权限
	auths: [],
	// 用户菜单
	menus: [
		{
			key: uuidV4(),
			title: '工作台',
			path: '/home',
			icon: 'icon-box',
		},
		{
			key: uuidV4(),
			title: '数据看板',
			icon: 'icon-box',
		},
		{
			key: uuidV4(),
			title: '系统设置',
			icon: 'icon-box',
			children: [
				{
					key: uuidV4(),
					title: '用户管理',
					icon: 'icon-box',
				},
				{
					key: uuidV4(),
					title: '角色管理',
					icon: 'icon-box',
				},
				{
					key: uuidV4(),
					title: '部门管理',
					icon: 'icon-box',
				},
				{
					key: uuidV4(),
					title: '权限管理',
					icon: 'icon-box',
				},
				{
					key: uuidV4(),
					title: '菜单管理',
					icon: 'icon-box',
				},
				{
					key: uuidV4(),
					title: '字典管理',
					icon: 'icon-box',
				},
			],
		},
		{
			key: uuidV4(),
			title: '组件',
			icon: 'icon-box',
		},
		{
			key: uuidV4(),
			title: '页面',
			icon: 'icon-box',
		},
		{
			key: uuidV4(),
			title: '外部页面',
			icon: 'icon-box',
			children: [
				{
					key: uuidV4(),
					title: '内嵌页面',
					icon: 'icon-box',
				},
				{
					key: uuidV4(),
					title: '外链页面',
					icon: 'icon-box',
				},
			],
		},
		{
			key: '///666',
			parentId: null,
			title: '多级菜单',
			icon: 'icon-box',
			children: [
				{
					key: '///6666',
					parentId: '///666',
					title: '二级菜单一',
					icon: 'icon-box',
					children: [
						{
							key: uuidV4(),
							parentId: '///6666',
							title: '三级菜单一',
							path: '/moreMenu3-1',
							icon: 'icon-box',
						},
					],
				},
				{
					key: uuidV4(),
					title: '二级菜单二',
					icon: 'icon-box',
				},
			],
		},
	],
	// 是否是否支持展开多项菜单
	isOpenMoreKeys: false,
	// 展开菜单项数组
	openMenuKeys: [],
};

export default state;
