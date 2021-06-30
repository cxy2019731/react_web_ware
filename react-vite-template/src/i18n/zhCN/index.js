/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:35:02
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:35:03
 * @FilePath: \react-vite2-template\src\i18n\zhCN\index.js
 */
import login from './login';
import header from './header';
export default {
	...login,
	...header,
	'global.language.zhCN': '简体中文',
	'global.language.enUS': 'English',
	'global.loading.text': '加载中',
};
