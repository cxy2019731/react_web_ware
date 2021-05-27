const { getThemeVariables } = require('antd/dist/theme');

const createViteCss = () => {
	const config = {
		postcss: {
			plugins: [
				require('postcss-pxtorem')({
					rootValue: 16,
					propList: ['*'],
					unitPrecision: 1,
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
					// customTheme,
				}),
			},
			scss: {},
		},
	};

	return config;
};

module.exports = {
	createViteCss,
};
