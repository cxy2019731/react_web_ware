/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:23:07
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:23:07
 * @FilePath: \react-vite2-template\src\store\global\state.js
 */
import { uniq } from 'lodash';
import { getTreeArrPaths, getMenuInfo } from '@utils';
//左侧菜单- 展开收起菜单
export function set_collapsed(_, ms) {
	return {
		collapsed: !ms.collapsed,
	};
}
//左侧菜单- 菜单项展开
export function openMenu(menuItemKeys, { openMenuKeys, menus, isOpenMoreKeys }, fnCtx) {
	if (isOpenMoreKeys) {
		// 多选
		if (menuItemKeys.length) {
			if (menuItemKeys.length === 1) {
				if (openMenuKeys.includes(menuItemKeys[0])) {
					return {
						openMenuKeys: openMenuKeys.filter((l) => l != menuItemKeys[0]),
					};
				}
			}
			return {
				openMenuKeys: uniq([...openMenuKeys, ...menuItemKeys]),
			};
		}
	} else {
		// 单选
		if (menuItemKeys.length === 1) {
			if (openMenuKeys.includes(menuItemKeys[0])) {
				return {
					openMenuKeys: openMenuKeys.filter((lll) => lll != menuItemKeys[0]),
				};
			}
			const menuPaths = getTreeArrPaths(menus, getMenuInfo(menus, menuItemKeys[0]))
				.filter((l) => !l.path)
				.map((ll) => ll.id);
			if (
				menuPaths.length &&
				openMenuKeys.length &&
				menuPaths.includes(menuItemKeys[0]) &&
				menuPaths.join(',').indexOf(openMenuKeys.join(',')) != -1
			) {
				return {
					openMenuKeys: [...openMenuKeys, menuItemKeys[0]],
				};
			}

			return {
				openMenuKeys: menuItemKeys,
			};
		}

		return {
			openMenuKeys: menuItemKeys,
		};
	}
}
