const createViteAlias = () => {
	const config = [
		// src-文件夹
		{ find: '@', replacement: '/src' },
		// 请求封装
		{ find: '@request', replacement: '/src/service/request.js' },
		// 接口封装-文件夹
		{ find: '@http', replacement: '/src/service/http' },
		// 方法封装
		{ find: '@utils', replacement: '/src/utils/index.js' },
		// 全局常量
		{ find: '@constant', replacement: '/src/base/constant.js' },
		// concent 连接模块函数
		{ find: '@useConcent', replacement: '/src/base/useConcent.js' },
		// concent 获取全部模块reducer
		{ find: '@getAllModuleMr', replacement: '/src/base/cc_reducer.js' },
		// concent 获取全部模块状态state
		{ find: '@getAllModuleState', replacement: '/src/base/cc_state.js' },
		// 组件导出
		{ find: '@components', replacement: '/src/components' }
	];

	return config;
};

module.exports = { createViteAlias };
