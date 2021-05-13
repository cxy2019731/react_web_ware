import * as icons from './icons.js';
import { useMemo } from 'react';

function FontIcon({ name = null, style = {}, color, size, stroke }) {
	const icon_list = useMemo(() => {
		const nowIcons = {};
		for (let key in icons) {
			nowIcons[key.toLowerCase()] = icons[key];
		}
		return nowIcons;
	}, [icons]);

	const Icon = useMemo(() => {
		const __name = 'icon' + name;
		if (name && icon_list[__name]) {
			return icon_list[__name];
		}
		return null;
	}, [icon_list, name]);

	const __props = useMemo(() => {
		return {
			style,
			color,
			size,
			stroke,
		};
	}, [style, color, size, stroke]);

	return <>{name ? <Icon {...__props} /> : null}</>;
}

export default FontIcon;
