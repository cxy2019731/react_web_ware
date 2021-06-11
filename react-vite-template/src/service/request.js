/*
 * @Author: itmanyong
 * @Date: 2021-04-07 14:34:16
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:09:37
 * @FilePath: \react-vite2-template\src\service\request.js
 */
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { isTokenEffective, getToken } from '@utils';
import mr from '@/base/cc_reducer';
import { _CC_USER, _TOKEN } from '@constant';
/**
 * URL白名单,无需携带TOKEN-一般后端会做处理,这里配置主要是防止请求拦截中检测TOKEN
 */
const whiteUrls = ['/user/login'];
/**
 * 状态码提示设置
 */
const errorTips = {
	400: '请求错误,请检查',
	401: '授权失效/未登录,请重新登录',
	403: '禁止访问,服务器拒绝/资源损坏',
	404: '请求失败,相关资源未找到',
	405: '请求的资源不允许使用此方法访问',
	406: 'Accept头类型不正确',
	407: '代理服务器需要认证信息',
	408: '请求超时,请稍候再试',
	409: '文件版本有误,请确认后再试',
	410: '当前资源已被转移,无法正确访问',
	411: '当前请求无法处理',
	412: '请求头信息错误,无法处理',
	413: '请求资源过大,无法处理',
	414: 'URL过长,无法处理',
	415: '请求参数类型无效,无法处理',
	500: '服务器内部错误',
	501: '服务器不支持当前请求类型',
	502: '网关代理错误,请检查',
	503: '服务器维护/超载,暂无法处理',
	504: '网关超时,请稍候再试',
	505: '服务器不支持当前请求的HTTP版本',
};

/**
 * axios请求实例
 */
const instance = axios.create({
	baseURL: `/base/api`,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
	responseType: 'json',
	withCredentials: false,
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
	(config) => {
		// 1.识别白名单
		if (!whiteUrls.some((url) => config.url.indexOf(url) != -1)) {
			// 添加TOKEN-没有TOKEN去登陆
			if (!isTokenEffective()) {
				mr[_CC_USER].reset();
			}
			config.headers[_TOKEN] = getToken();
		}
		// 2.加密
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		const { data } = response;
		// 1.解密
		// 2.返回
		if (data.code && data.message) {
			message.error(data.message);
		}
		return Promise.resolve(data);
	},
	(error) => {
		const { response } = error;
		// 2.异常提示
		let errorText = errorTips[response.status] || `请求响应异常,请稍后再试!`;
		if (response.data) {
			errorText = response.data.msg || response.data.message || errorText;
		}
		// 3.异常处理
		switch (response.status) {
			case 401:
				// 跳去登录/授权
				mr[_CC_USER].reset();
				break;
		}
		return Promise.reject(errorText);
	},
);

/**
 * 请求函数
 * @param {object} options 请求参数
 * @returns promise object
 */
function request(options) {
	const {
		url = '',
		method = 'GET',
		data = null,
		urlTemplate = null,
		isTip = true,
		// configProps参见 http://www.axios-js.com/zh-cn/docs/ 中的请求配置
		...configProps
	} = options;

	// 1.替换模板参数获取新URL
	// 2.组合参数
	const params = {
		url: url,
		method: method,
	};
	if (data && ['POST', 'PUT', 'PATCH'].some((l) => l === method)) {
		params.data = data;
	} else {
		params.params = data;
	}
	return new Promise((resolve, reject) => {
		instance
			.request({ ...params, ...configProps })
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				// 进行提示
				message.error(error || '请求失败,请稍候再试');
				resolve({
					code: 1,
					message: JSON.stringify(error),
				});
			});
	});
}
export default request;
