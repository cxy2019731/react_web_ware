import { _SETTINGS, _USER, _LOCAL_ROUTER_PATH } from '@constant';
import css from './sider.module.css';
import PerfectScrollbar from 'perfect-scrollbar';
import Menu from './components/Menu';
import { useLocation } from 'react-router-dom';
import { getMenuInfo, getTreeArrPaths } from '@utils';

function Sider(props) {
	const location = useLocation();

	const { moduleState: ms, connectedState: cs, connectedReducer: cr } = useConcent({ module: _SETTINGS, connect: [_USER] });

	const userCs = cs[_USER];
	const userCr = cr[_USER];

	const refSider = React.useRef(null);

	const matchMenu = React.useMemo(() => {
		const matchItem = getMenuInfo(userCs.menus, location.pathname) || {};
		if (location.pathname) {
			sessionStorage.setItem(_LOCAL_ROUTER_PATH, location.pathname);
		}
		return matchItem;
	}, [location.pathname, userCs.menus]);

	React.useEffect(() => {
		const menuPaths = getTreeArrPaths(userCs.menus, matchMenu);
		userCr.openMenu(menuPaths.map((l) => l.key));
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
		<div ref={refSider} className={css.sider} style={{ width: ms.sider_width }}>
			<Menu matchMenu={matchMenu} />
		</div>
	);
}

export default React.memo(Sider);
