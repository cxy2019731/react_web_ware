import { _SETTINGS, _LOCAL_ROUTER_PATH } from '@constant';
import css from './sider.module.css';
import PerfectScrollbar from 'perfect-scrollbar';
import { useLocation } from 'react-router-dom';
import { getMenuInfo, getTreeArrPaths } from '@utils';
import OpenMenu from './components/OpenMenu';
import ShutMenu from './components/ShutMenu';

function Sider(props) {
	const location = useLocation();

	const { moduleState: ms, mr } = useConcent({ module: _SETTINGS });

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
		<div ref={refSider} className={css.sider} style={{ width: ms.collapsed ? ms.sider_width : ms.sider_item_height }}>
			{ms.collapsed ? <OpenMenu matchMenu={matchMenu} /> : <ShutMenu matchMenu={matchMenu} />}
		</div>
	);
}

export default React.memo(Sider);
