const createViteAlias = () => {
	const config = [
		{ find: '@', replacement: '/src' },
		{ find: 'request', replacement: '/src/service/request.js' },
		{ find: 'http', replacement: '/src/service/http' },
		{ find: 'utils', replacement: '/src/utils/index.js' },
		{ find: 'less', replacement: '/src/styles/local' },
		{ find: 'cstMod', replacement: '/src/base/cstMod.js' },
		{ find: 'useConcent', replacement: '/src/base/useConcent.js' },
		{ find: 'useSetup', replacement: '/src/base/useSetup.js' },
		{ find: 'FontIcon', replacement: '/src/components/FontIcon/index.jsx' },
		{ find: /^~/, replacement: '' },
	];

	return config;
};

module.exports = { createViteAlias };
