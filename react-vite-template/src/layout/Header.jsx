import { _CC_SETTINGS, _CC_GLOBAL, _CC_USER } from '@constant';
import css from './header.module.css';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	LockOutlined,
	PoweroffOutlined,
	ExclamationCircleOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Dropdown, Modal } from 'antd';
import { emit } from 'concent';
import { _EVENT_SETTINGS_VISIBLE } from '@constant';
import SettingsDrawer from './components/SettingsDrawer';
import { Language } from '@components';

function HeaderView(props) {
	const {
		state,
		moduleState: ms,
		mr,
		connectedState: cs,
		connectedReducer: cr,
	} = useConcent({ module: _CC_SETTINGS, connect: [_CC_GLOBAL, _CC_USER], props });
	const globalCs = cs[_CC_GLOBAL];
	const userCs = cs[_CC_USER];
	const userCr = cr[_CC_USER];
	const headerModuleWidth = React.useMemo(() => ({ width: ms.header_height }), [ms.header_height]);

	const menuHandler = ({ key }) => {
		switch (key) {
			case 'user_info':
				break;

			case 'user_pwd':
				break;
			case 'exit_system':
				Modal.confirm({
					title: fr('header.right.menu.user.exit.title'),
					icon: <ExclamationCircleOutlined />,
					content: fr('header.right.menu.user.exit.content'),
					onOk() {
						userCr.resetStatus();
					},
				});
				break;
			default:
				break;
		}
	};

	const userMenu = (
		<Menu onClick={menuHandler}>
			<Menu.Item key='user_info' icon={<UserOutlined />}>
				{fr('header.right.menu.user.info')}
			</Menu.Item>
			<Menu.Item key='user_pwd' icon={<LockOutlined />}>
				{fr('header.right.menu.user.pwd')}
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key='exit_system' icon={<PoweroffOutlined />}>
				{fr('header.right.menu.user.exit')}
			</Menu.Item>
		</Menu>
	);

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
			<div className={css.header_right}>
				<span className={css.username}>{userCs?.info?.nickName || ''}</span>
				<Dropdown overlay={userMenu} trigger={['hover']}>
					<Avatar src={userCs?.info?.avatar || ''} />
				</Dropdown>
				<Language />
				<SettingOutlined onClick={() => emit(_EVENT_SETTINGS_VISIBLE, true)} />
			</div>
			<SettingsDrawer />
		</div>
	);
}

export default HeaderView;
