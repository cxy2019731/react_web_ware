import { _CC_SETTINGS, _CC_GLOBAL } from '@constant';
import css from './header.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function HeaderView(props) {
	const { state, moduleState: ms, mr, connectedState: cs } = useConcent({ module: _CC_SETTINGS, connect: [_CC_GLOBAL], props });
	const globalCs = cs[_CC_GLOBAL];
	const headerModuleWidth = React.useMemo(() => ({ width: ms.header_height }), [ms.header_height]);

	return (
		<div className={css.header} style={{ height: ms.header_height }}>
			<div className={css.logo} style={{ width: ms.layoutMode === 'leftMixin' || ms.collapsed ? ms.sider_width : ms.header_height }}>
				<img src={globalCs.logo} />
			</div>
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
