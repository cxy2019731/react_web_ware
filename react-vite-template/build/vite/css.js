const { getThemeVariables } = require('antd/dist/theme');
import customTheme from '../config/theme';
const createViteCss = () => {
	const config = {
		postcss: {
			plugins: [
				require('postcss-pxtorem')({
					rootValue: 32,
					propList: ['*'],
					unitPrecision: 5,
					exclude: /(node_module)/,
				}),
			],
		},
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: getThemeVariables({
					dark: false,
					compact: false,
					customTheme,
				}),
			},
			scss: {
				additionalData: "@import '@/styles/base.scss';", //全局样式,针对scss文件生效,可直接使用里面的变量
			},
		},
	};

	return config;
};

module.exports = {
	createViteCss,
};
