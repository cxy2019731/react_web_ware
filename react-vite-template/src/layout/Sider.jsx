import { _SETTINGS, _USER } from '@constant';
import css from './sider.module.css';
import { v4 as uuidV4 } from 'uuid';
import { SettingOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Icon } from '@components';

export default (props) => {
	const { state, moduleState: ms, connectedState: cs } = useConcent({ module: _SETTINGS, connect: [_USER], props });
	const csUser = cs[_USER];
	const refSider = React.useRef(null);

	React.useEffect(() => {
		if (refSider.current) {
			const ps = new PerfectScrollbar(refSider.current, {
				wheelSpeed: 2,
				minScrollbarLength: 20,
			});
		}
	}, [refSider]);

	return (
		<div ref={refSider} className={css.sider} style={{ width: ms.sider_width }}>
			<Menu menus={csUser.menus} />
		</div>
	);
};

function Menu(props) {
	const { menus = [] } = props;
	if (!menus.length) {
		return null;
	}

	return (
		<ul className={css.menu}>
			{menus.map((item, index) => (
				<li className={css.menu_item} key={item.key}>
					<span className={css.menu_item_icon}>
						<SettingOutlined />
					</span>
					<span className={css.menu_item_title}>{item.title || item.name}</span>
					<span className={css.menu_item_arrow}>
						<Icon type='icon-chevron-right' />
					</span>
				</li>
			))}
		</ul>
	);
}
