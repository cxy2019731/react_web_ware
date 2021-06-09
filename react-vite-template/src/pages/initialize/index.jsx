import { useNavigate } from 'react-router-dom';
import { _HOME, _USER, _LOCAL_ROUTER_PATH } from '@constant';
import { useInterval } from 'ahooks';
import css from './index.module.less';
import { httpGetUserInfo } from '@http';

// 进度百分比管理
const _user_count = 100; //用户信息

function setup(ctx) {
	ctx.initState({
		progress: 0,
		targetProgress: 0,
	});

	const st = {
		changeProgress: () => ctx.setState({ progress: ctx.state.progress + 1 }),
		changeUserCount: (pc) => ctx.setState({ targetProgress: pc + ctx.state.targetProgress }),
	};

	return st;
}

export default (props) => {
	const navigate = useNavigate();

	const { state, settings: st, mr } = useConcent({ module: _USER, setup });

	useInterval(st.changeProgress, state.progress < state.targetProgress ? 0 : null);
	// 用户信息get
	const getUserInfo = async () => {
		st.changeUserCount(_user_count / 2);
		const res = await httpGetUserInfo();
		if (res) {
			mr.setUserInfo(res);
			st.changeUserCount(_user_count / 2);
		}
	};

	// 用户登录完成
	React.useEffect(() => {
		if (state.isLogin) {
			getUserInfo();
		}
	}, [state.isLogin]);

	// 加载完成跳转
	React.useEffect(() => {
		if (state.progress >= 100) {
			const catch_router_path = sessionStorage.getItem(_LOCAL_ROUTER_PATH) || null;
			navigate(catch_router_path || _HOME);
		}
	}, [state.progress]);

	return (
		<div className={css.initialize}>
			<div className={css.percentage}>
				<span className={css.text}>{fr('global.loading.text')}</span>
				<div className={css.status}>
					<div className={css.charging}></div>
					<span className={css.progress}>
						<span>{state.progress}</span>
						<small>%</small>
					</span>
				</div>
				<div className={css.contrast}>
					<div className={css.blackhole}></div>
					<div className={css.lithium}>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</div>
				</div>
			</div>
		</div>
	);
};
