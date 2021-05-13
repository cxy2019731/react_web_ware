// 插件
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
// 插件-独立配置
import styleImport from './styleImport';
import legacy from './legacy';

const createVitePlugins = (isService, isBuild) => {
	const vitePlugins = [reactRefresh(), svgr(), styleImport()];

	if (isBuild) {
		vitePlugins.push(legacy());
	}

	return vitePlugins;
};

module.exports = {
	createVitePlugins,
};
