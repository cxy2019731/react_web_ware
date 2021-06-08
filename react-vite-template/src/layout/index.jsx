import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';
import css from './index.module.css';
import { _SETTINGS } from '@constant';

function setup(ctx) {
	ctx.initState({});

	const st = {};

	return st;
}

function LayoutView(props) {
	const { state, moduleState: ms } = useConcent({ module: _SETTINGS, setup, props });
	console.log(ms);
	return (
		<>
			<Header />
			<div style={{ height: `calc(100vh - ${ms.header_height})` }}>
				<Sider />
				<div>
					<Outlet />
					<Footer />
				</div>
			</div>
		</>
	);
}

export default LayoutView;
