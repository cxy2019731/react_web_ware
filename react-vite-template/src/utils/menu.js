/**
 * 关于路由-菜单的方法
 */
import { flattenTree } from '@utils';
import { _ROUTER_IFRAME } from '@constant';
/**
 * 获取匹配的菜单的信息
 * @param {array} menus 数组
 * @param {strng} id 唯一值
 * @returns object
 */
export function getMenuInfo(menus = [], id) {
	const flatMenus = flattenTree(menus);
	if (id.indexOf(_ROUTER_IFRAME) != -1) {
		return flatMenus.find((l) => l?.href?.indexOf(id.split('.')[1]));
	} else {
		return flatMenus.find((l) => l.id === id || l.path === id);
	}
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
