import css from './SettingsDrawer.module.css';
import { Drawer } from 'antd';
import { _EVENT_SETTINGS_VISIBLE } from '@constant';

function setup(ctx) {
	const { setState } = ctx;
	ctx.initState({
		visible: false,
	});

	const st = {
		set_visible: (bool) => setState({ visible: bool || false }),
	};

	ctx.on(_EVENT_SETTINGS_VISIBLE, st.set_visible);

	return st;
}

function SettingsDrawer(props) {
	const { state, settings: st } = useConcent({ setup, props });
	return (
		<Drawer
			title={fr('header.right.custom.title')}
			visible={state.visible}
			placement='right'
			width={500}
			onClose={() => st.set_visible()}></Drawer>
	);
}

export default React.memo(SettingsDrawer);
