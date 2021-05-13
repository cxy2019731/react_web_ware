/*
 * @Author: itmanyong
 * @Date: 2021-04-08 15:27:04
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2021-04-08 15:28:36
 * @FilePath: \react-vite2-template\src\configs\runConcent.js
 */
import { run, clearContextIfHot } from 'concent';
import models from '@/store/index';
clearContextIfHot(true);

run(models, {
	isHot: true,
});
