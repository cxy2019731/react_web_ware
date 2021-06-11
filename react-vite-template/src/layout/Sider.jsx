import { _CC_SETTINGS, _LOCAL_ROUTER_PATH } from '@constant';
import css from './sider.module.css';
import PerfectScrollbar from 'perfect-scrollbar';
import { useLocation } from 'react-router-dom';
import { getMenuInfo, getTreeArrPaths } from '@utils';
import OpenMenu from './components/OpenMenu';
import ShutMenu from './components/ShutMenu';
import FloatMenu from './components/FloatMenu';

function setup(ctx) {
	ctx.initState({
		floatMenuData: null,
		cbHover: false,
	});

	ctx.on('_sider_float_menu_coods', (floatMenuData) =>
		ctx.setState({
			floatMenuData,
		}),
	);
	const st = {
		floatCbHiver: (val) => ctx.setState({ cbHover: val || false }),
	};
	return st;
}

function Sider(props) {
	const location = useLocation();

	const { state, settings: st, moduleState: ms, mr } = useConcent({ module: _CC_SETTINGS, setup, props });

	const refSider = React.useRef(null);

	const matchMenu = React.useMemo(() => {
		const matchItem = getMenuInfo(ms.menus, location.pathname) || null;
		if (location.pathname) {
			sessionStorage.setItem(_LOCAL_ROUTER_PATH, location.pathname);
		}
		return matchItem;
	}, [location.pathname, ms.menus]);

	React.useEffect(() => {
		if (matchMenu) {
			const menuPaths = getTreeArrPaths(ms.menus, matchMenu);
			mr.openMenu(menuPaths.map((l) => l.id));
		}
	}, [matchMenu]);

	React.useEffect(() => {
		if (refSider.current) {
			const ps = new PerfectScrollbar(refSider.current, {
				wheelSpeed: 2,
				minScrollbarLength: 20,
			});
		}
	}, [refSider]);

	return (
		<div className={css.menu}>
			<div ref={refSider} className={css.sider} style={{ width: ms.collapsed ? ms.sider_width : ms.header_height }}>
				{ms.collapsed ? (
					<OpenMenu matchMenu={matchMenu} menus={ms.menus} openMenuKeys={ms.openMenuKeys} openMenu={mr.openMenu} />
				) : (
					<ShutMenu matchMenu={matchMenu} menus={ms.menus} cbHover={st.floatCbHiver} />
				)}
			</div>
			{!ms.collapsed && state.floatMenuData ? (
				<FloatMenu matchMenu={matchMenu} {...state.floatMenuData} rootMenuIsHover={state.cbHover} />
			) : null}
		</div>
	);
}

export default React.memo(Sider);
