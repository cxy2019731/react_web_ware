/**
 * 关于路由-菜单的方法
 */
import { flattenTree } from '@utils';
/**
 * 获取匹配的菜单的信息
 * @param {array} menus 数组
 * @param {strng} id 唯一值
 * @returns object
 */
export function getMenuInfo(menus = [], id) {
	const flatMenus = flattenTree(menus);
	return flatMenus.find((l) => l.id === id || l.path === id);
}

/**
 * 获取菜单的父级、祖宗级
 * @param {array} menus 数组
 * @param {strng} id 唯一值
 * @returns object
 */
export function getTreeArrPaths(menus = [], item) {
	let arr = [item];
	if (item.parentId) {
		const parentItem = getMenuInfo(menus, item.parentId);
		if (parentItem) {
			arr = [...getTreeArrPaths(menus, parentItem), ...arr];
		}
	}
	return arr;
}
