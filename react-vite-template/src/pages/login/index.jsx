import { _INITIALIZE, _USER } from '@constant';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@utils';
import { useKeyPress } from 'ahooks';
import WavesBall from '@components/WavesBall/index';
function setup(ctx) {
	ctx.initState({
		username: '',
		password: '',
		loading: false,
	});

	const st = {
		usernameChange: ctx.sync('username'),
		passwordChange: ctx.sync('password'),
		loadingChange: ctx.syncBool('loading'),
		reset: () => ctx.setState({ username: '', password: '' }),
	};

	return st;
}

function LoginView() {
	const navigate = useNavigate();

	const { state, moduleState: ms, settings: st, mr } = useConcent({ module: _USER, setup });

	const submit = async () => {
		st.loadingChange();
		mr.login({ username: state.username, password: state.password });
	};
	useKeyPress('enter', submit);

	React.useEffect(() => {
		if (ms.isLogin) {
			navigate(_INITIALIZE);
		} else {
			removeToken();
		}
	}, []);

	return (
		<>
			<div>
				<label>
					账户：
					<input value={state.username} onChange={st.usernameChange} disabled={state.loading} placeholder='用户名' />
				</label>
			</div>
			<div>
				<label>
					密码：
					<input value={state.password} onChange={st.passwordChange} disabled={state.loading} placeholder='密码：' />
				</label>
			</div>
			<div>
				<button onClick={submit} disabled={state.loading}>
					登录
				</button>
				<button onClick={st.reset} disabled={state.loading}>
					重置
				</button>
				{state.loading ? 'loading...' : null}
			</div>
			<WavesBall />
		</>
	);
}

export default LoginView;


