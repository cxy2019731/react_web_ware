import css from './index.module.css';
import { Avatar, Modal } from 'antd';
import { _GLOBAL, _USER } from '@constant';
import { PoweroffOutlined, ExclamationCircleOutlined, SnippetsOutlined } from '@ant-design/icons';
import { httpLogout } from '@http';
import { v4 as uuidV4 } from 'uuid';

function setup(ctx) {
	const { setState } = ctx;
	ctx.initState({});
	const st = {};
	return st;
}

function HomeView(props) {
	const ctx = useConcent({ module: _GLOBAL, connect: [_USER], setup });

	const { state, moduleState: ms, connectedState: cs, cr } = ctx;

	// 退出账户
	const logout = () => {
		Modal.confirm({
			title: '确定退出当前登录账户?',
			icon: <ExclamationCircleOutlined />,
			content: '请注意保存数据/工作',
			centered: true,
			cancelText: `再想想`,
			okText: `确认退出`,
			async onOk() {
				const res = await httpLogout();
				if (res) {
					cr[_USER].resetStatus();
				}
			},
		});
	};

	return <div></div>;
}

export default HomeView;
