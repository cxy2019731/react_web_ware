/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:24:50
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:29:50
 * @FilePath: \react-vite2-template\src\store\global\lifecycle.js
 */
import { isTokenEffective,removeToken } from '@utils';

const lifecycle = {
	initState() {
		// 校验token
		const token = isTokenEffective();
		if (token) {
			return {
				isLogin: true,
			};
		}else{
			removeToken()
		}
	},
	initStateDone() {},
	loaded() {},
	mounted() {},
	willUnmount() {},
};
export default lifecycle;
