import { _SETTINGS } from '@constant';
import css from './header.module.css';
function HeaderView(props) {
	const { state, moduleState: ms } = useConcent({ module: _SETTINGS, props });

	return (
		<div className={css.header} style={{ height: ms.header_height }}>
			<div style={{ width: ms.sider_width }}></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default HeaderView;
