/*
 * @Author: itmanyong
 * @Date: 2021-04-07 13:35:46
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:38:56
 * @FilePath: \react-vite2-template\src\utils\index.js
 */
import { _TOKEN, _TOKEN_TIME } from '@constant';
// 获取token
export function getToken(_break = false) {
	const token = localStorage.getItem(_TOKEN);
	if (!token) {
		return '';
	}
	return _break ? JSON.parse(token.split('___')[0]) : token;
}
// 设置token
export function setToken(token) {
	localStorage.setItem(_TOKEN, typeof token === 'string' ? token : JSON.stringify(token) + `___${new Date().getTime()}`);
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
		const oldTime = +token.split(`___`)[1];
		const nowTime = new Date().getTime();
		return (nowTime - oldTime) / 1000 <= _TOKEN_TIME;
	}
	return false;
}
