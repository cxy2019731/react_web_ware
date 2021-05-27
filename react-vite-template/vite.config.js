/*
 * @Author: itmanyong
 * @Date: 2021-04-08 13:42:26
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:39:21
 * @FilePath: \react-vite2-template\vite.config.js
 */
import vite from 'vite';
// https://vitejs.dev/config/
import { createViteAlias } from './build/vite/alias';
import { createVitePlugins } from './build/vite';
import { createViteServer } from './build/vite/server';
import { createViteCss } from './build/vite/css';
import { createViteBuild } from './build/vite/build';

/**
 * command = serve or build
 * mode = development or production
 */
export default ({ command, mode }) => {
	const isDev = mode === 'development';
	const isProd = mode === 'production';
	const isService = command === 'serve';
	const isBuild = command === 'build';

	const config = {
		base: '/',
		root: process.cwd(),
		esbuild: {
			jsxInject: `import React from 'react';import useConcent from '@useConcent';`,
		},
		resolve: {
			alias: createViteAlias(),
		},
		server: createViteServer(),
		css: createViteCss(),
		plugins: createVitePlugins(isService, isBuild),
	};
	if (isBuild) {
		config.build = createViteBuild();
	}

	return config;
};
