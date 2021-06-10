import { _SETTINGS } from '@constant';
import css from './header.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function HeaderView(props) {
	const { state, moduleState: ms, mr } = useConcent({ module: _SETTINGS, props });

	const headerModuleWidth = React.useMemo(() => ({ width: ms.header_height }), [ms.header_height]);

	return (
		<div className={css.header} style={{ height: ms.header_height }}>
			<div style={{ width: ms.sider_width }}></div>
			<div className={css.header_center}>
				<div className={css.header_center_collapsed} style={{ ...headerModuleWidth }} onClick={mr.set_collapsed}>
					{ms.collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default HeaderView;
