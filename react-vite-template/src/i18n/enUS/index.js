/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:35:02
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:35:45
 * @FilePath: \react-vite2-template\src\i18n\enUS\index.js
 */
import login from './login';
import header from './header';
export default {
	...login,
	...header,
	'global.language.zhCN': 'Chinese',
	'global.language.enUS': 'English',
	'global.loading.text':'Loading',
};
