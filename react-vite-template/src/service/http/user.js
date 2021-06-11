/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:07:28
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:10:13
 * @FilePath: \react-vite2-template\src\service\http\user.js
 */
import request from '@request';
import { PROFIX_USER } from '@/service/prefix';
import cr from '@/base/cc_reducer';
import { _CC_USER } from '@constant';

/**
 * 登录
 */
export const USER_LOGIN = `${PROFIX_USER}login`;
export async function httpLogin({ userName, passWord }) {
	const { code, data } = await request({
		url: USER_LOGIN,
		method: `POST`,
		data: { userName, passWord },
	});
	if (!code && data) {
		cr[_CC_USER].login(data);
		return true;
	} else {
		return null;
	}
}

/**
 * 获取用户信息
 */
export const USER_GET = `${PROFIX_USER}get`;
export async function httpGetUserInfo(id) {
	const { code, data } = await request({
		url: USER_GET,
		method: 'GET',
		data: { id },
	});
	if (!code) {
		return data;
	}
	return null;
}

/**
 * 退出账户
 */
export const USER_LOGOUT = `${PROFIX_USER}logout`;
export async function httpLogout() {
	return await request({
		url: USER_LOGOUT,
		method:'POST'
	});
}
