import { getState } from 'concent';

/**
 * 获取指定模块下的状态数据-不具备响应式
 * @param {string} moduleName 模块名称
 * @returns object
 */
export default function (moduleName) {
	return getState(moduleName);
}
