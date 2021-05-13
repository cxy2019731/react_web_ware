/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:23:07
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:26:34
 * @FilePath: \react-vite2-template\src\store\global\index.js.js
 */
import { _SETTINGS } from 'cstMod';
import state from './state';
import lifecycle from './lifecycle';
import * as watch from './watch';
import * as reducer from './reducer';
import * as computed from './computed';

export default {
	[_SETTINGS]: {
		state,
		lifecycle,
		watch,
		reducer,
		computed,
	},
};
