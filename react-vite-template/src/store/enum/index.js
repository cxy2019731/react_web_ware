import { _CC_ENUM } from '@constant';
import state from './state';
import lifecycle from './lifecycle';
import * as watch from './watch';
import * as reducer from './reducer';
import * as computed from './computed';

export default {
	[_CC_ENUM]: {
		state,
		lifecycle,
		watch,
		reducer,
		computed,
	},
};
