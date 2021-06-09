/*
 * @Author: itmanyong
 * @Date: 2021-04-07 13:35:46
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:38:56
 * @FilePath: \react-vite2-template\src\utils\index.js
 */

export { getMenuInfo, getTreeArrPaths } from './menu';

import { _TOKEN, _TOKEN_TIME } from '@constant';
// 获取token
export function getToken() {
	return localStorage.getItem(_TOKEN) || null;
}
// 设置token
export function setToken(token) {
	localStorage.setItem(_TOKEN, typeof token === 'object' ? JSON.stringify(token) : token);
	return true;
}
// 删除token
export function removeToken() {
	localStorage.removeItem(_TOKEN);
	return true;
}
// 判断token是否有效
export function isTokenEffective() {
	const token = getToken();
	if (token) {
		const tokens = token.split('-');
		const oldTime = Number(tokens[1]);
		const nowTime = new Date().getTime();
		return !(nowTime - oldTime) <= Number(tokens[2]);
	}
	return false;
}
// 延时器-promise
export function delay(ms = 1000) {
	return new Promise((res, rej) => setTimeout(() => res(true), ms));
}
/**
 * 随机16进制颜色 randomHexColorCode
 * 方法二
 */
export const randomHexColorCode = () => {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};
/**
 * 递归构建树
 * @param {array} roots 数组
 * @param {atrinf} wrapper id值
 * @returns array
 */
export function buildTree(roots, wrapper, idKey = 'id') {
	return roots.map((item) => {
		if (wrapper.has(item[idKey])) {
			return {
				...item,
				children: buildTree(wrapper.get(item[idKey]), wrapper),
			};
		} else {
			return item;
		}
	});
}

/**
 * 扁平化数组
 * @param {array} items 数组
 * @param {string} childrenKey 子集字段名
 * @returns array
 */
export function flattenTree(items, childrenKey = 'children') {
	const flattenOptions = [];
	dfs(items);
	return flattenOptions;
	function dfs(nodes) {
		if (nodes == null) {
			return;
		}
		for (const node of nodes) {
			flattenOptions.push(node);
			if (!node[childrenKey] || !node[childrenKey].length) {
			} else {
				dfs(node[childrenKey]);
			}
		}
	}
}
