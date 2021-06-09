/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:23:07
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:23:07
 * @FilePath: \react-vite2-template\src\store\global\state.js
 */
import { isTokenEffective, removeToken, getToken } from '@utils';
import { _USER_STORAGE } from '@constant';
import { uniq } from 'lodash';
// 登录
export function login(token) {
	return {
		isLogin: true,
		token: token,
	};
}
// 用户信息
export function setUserInfo(info, ms) {
	return {
		info: {
			...ms.info,
			...info,
		},
		roles: info.roles || [],
		// 用户权限
		auths: info.auths || [],
	};
}
// 重置
export function resetStatus() {
	return {
		token: '',
		isLogin: false,
		info: {},
		roles: [],
		auths: [],
	};
}

// 初始化
export function init() {
	const isLogin = isTokenEffective();
	return { isLogin: isLogin ? true : false };
}
// 展开收起菜单
export function openMenu(menuItemKeys, ms) {
	console.log(menuItemKeys, ms.openMenuKeys);
	if (ms.isOpenMoreKeys) {
		// 多选
		return {
			openMenuKeys: uniq([...ms.openMenuKeys, ...menuItemKeys]),
		};
	} else {
		// 单选
		if (menuItemKeys.length) {
			if (menuItemKeys.length === 1) {
				if (ms.openMenuKeys.includes(menuItemKeys[0])) {
					return {
						openMenuKeys: ms.openMenuKeys.filter((l) => l != menuItemKeys[0]),
					};
				} else {
					return {
						openMenuKeys: menuItemKeys,
					};
				}
			} else {
				return {
					openMenuKeys: menuItemKeys.length > 1 ? menuItemKeys : uniq([...ms.openMenuKeys, ...menuItemKeys]),
				};
			}
		} else {
			return {
				openMenuKeys: [],
			};
		}
	}
}
