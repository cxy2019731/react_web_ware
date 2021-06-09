/*
 * @Author: itmanyong
 * @Date: 2021-05-31 11:40:34
 * @Last Modified by: itmanyong
 * @Last Modified time: 2021-06-09 16:55:44
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
			title: '系统设置',
			children: [
				{
					key: uuidV4(),
					title: '用户管理',
				},
				{
					key: uuidV4(),
					title: '角色管理',
				},
				{
					key: uuidV4(),
					title: '部门管理',
				},
				{
					key: uuidV4(),
					title: '权限管理',
				},
				{
					key: uuidV4(),
					title: '菜单管理',
				},
				{
					key: uuidV4(),
					title: '字典管理',
				},
			],
		},
		{
			key: uuidV4(),
			title: '系统设置',
			children: [
				{
					key: uuidV4(),
					title: '用户管理',
				},
				{
					key: uuidV4(),
					title: '角色管理',
				},
				{
					key: uuidV4(),
					title: '部门管理',
				},
				{
					key: uuidV4(),
					title: '权限管理',
				},
				{
					key: uuidV4(),
					title: '菜单管理',
				},
				{
					key: uuidV4(),
					title: '字典管理',
				},
			],
		},
	],
};

export default state;
