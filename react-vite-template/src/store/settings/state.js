/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:23:07
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:31:10
 * @FilePath: \react-vite2-template\src\store\global\state.js
 */
import { v4 as uuidV4 } from 'uuid';
const state = {
	// 头部高度
	header_height: `55px`,
	// 展开宽度
	sider_width: `220px`,
	// 菜单高度
	sider_item_height: `45px`,
	// 菜单收起与否
	collapsed: true,
	// 是否是否支持展开多项菜单
	isOpenMoreKeys: false,
	// 展开菜单项数组
	openMenuKeys: [],
	// 用户菜单
	menus: [
		{
			id: uuidV4(),
			title: '工作台',
			path: '/home',
			icon: 'icon-box',
		},
		{
			id: uuidV4(),
			title: '数据看板',
			icon: 'icon-box',
		},
		{
			id: uuidV4(),
			title: '系统设置',
			icon: 'icon-box',
			children: [
				{
					id: uuidV4(),
					title: '用户管理',
					icon: 'icon-box',
				},
				{
					id: uuidV4(),
					title: '角色管理',
					icon: 'icon-box',
				},
				{
					id: uuidV4(),
					title: '部门管理',
					icon: 'icon-box',
				},
				{
					id: uuidV4(),
					title: '权限管理',
					icon: 'icon-box',
				},
				{
					id: uuidV4(),
					title: '菜单管理',
					icon: 'icon-box',
				},
				{
					id: uuidV4(),
					title: '字典管理',
					icon: 'icon-box',
				},
			],
		},
		{
			id: uuidV4(),
			title: '组件',
			icon: 'icon-box',
		},
		{
			id: uuidV4(),
			title: '页面',
			icon: 'icon-box',
		},
		{
			id: uuidV4(),
			title: '外部页面',
			icon: 'icon-box',
			children: [
				{
					id: uuidV4(),
					title: '内嵌页面',
					icon: 'icon-box',
				},
				{
					id: uuidV4(),
					title: '外链页面',
					icon: 'icon-box',
				},
			],
		},
		{
			id: '///666',
			parentId: null,
			title: '多级菜单',
			icon: 'icon-box',
			children: [
				{
					id: '///6666',
					parentId: '///666',
					title: '二级菜单一',
					icon: 'icon-box',
					children: [
						{
							id: uuidV4(),
							parentId: '///6666',
							title: '三级菜单一',
							path: '/moreMenu3-1',
							icon: 'icon-box',
						},
					],
				},
				{
					id: uuidV4(),
					title: '二级菜单二',
					icon: 'icon-box',
				},
			],
		},
	],
};

export default state;
