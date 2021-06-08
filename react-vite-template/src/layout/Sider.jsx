import { _SETTINGS } from '@constant';
import css from './sider.module.css';
import { v4 as uuidV4 } from 'uuid';
import { SettingOutlined } from '@ant-design/icons';
const menus = [
	{
		key: uuidV4(),
		title: '系统设置',
		icon: <SettingOutlined />,
		children: [
			{
				key: uuidV4(),
				title: '用户管理',
				icon: <SettingOutlined />,
			},
			{
				key: uuidV4(),
				title: '角色管理',
				icon: <SettingOutlined />,
			},
			{
				key: uuidV4(),
				title: '部门管理',
				icon: <SettingOutlined />,
			},
			{
				key: uuidV4(),
				title: '权限管理',
				icon: <SettingOutlined />,
			},
			{
				key: uuidV4(),
				title: '菜单管理',
				icon: <SettingOutlined />,
			},
			{
				key: uuidV4(),
				title: '字典管理',
				icon: <SettingOutlined />,
			},
		],
	},
];

export default (props) => {
	const { state, moduleState: ms } = useConcent({ module: _SETTINGS, props });

	return (
		<div className={css.sider} style={{ width: ms.sider_width }}>
			
		</div>
	);
};
