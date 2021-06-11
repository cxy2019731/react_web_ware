import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';
import css from './index.module.css';
import { _CC_SETTINGS } from '@constant';
import PerfectScrollbar from 'perfect-scrollbar';

function setup(ctx) {
	ctx.initState({});

	const st = {};

	return st;
}

function LayoutView(props) {
	const { state, moduleState: ms } = useConcent({ module: _CC_SETTINGS, setup, props });
	const refMainContent = React.useRef(null);

	React.useEffect(() => {
		if (refMainContent.current) {
			const ps = new PerfectScrollbar(refMainContent.current, {
				wheelSpeed: 2,
				minScrollbarLength: 20,
			});
		}
	}, [refMainContent]);

	return (
		<>
			<Header />
			<div className={css.main} style={{ height: `calc(100vh - ${ms.header_height})` }}>
				<Sider />
				<div className={css.main_content} ref={refMainContent}>
					<Outlet />
					<Footer />
				</div>
			</div>
		</>
	);
}

export default LayoutView;
