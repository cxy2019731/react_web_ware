import { useNavigate } from 'react-router-dom';
import { _HOME, _USER } from '@constant';
import { useInterval } from 'ahooks';
import css from './index.module.less';

function setup(ctx) {
	ctx.initState({
		progress: 0,
		// 用户数据
		userTime: null,
		userCount: 101,
	});

	const st = {
		changeProgress: () => ctx.setState({ progress: ctx.state.progress + 1 }),
		changeUserTime: () => ctx.setState({ userTime: ctx.state.userCount - 1 > 0 ? 50 : null }),
		changeUserCount: () => {
			ctx.setState({
				userCount: ctx.state.userCount - 1,
			});
			st.changeUserTime();
			st.changeProgress();
		},
	};
	return st;
}

export default (props) => {
	const navigate = useNavigate();
	const { state, settings: st, moduleState: ms, mr } = useConcent({ module: _USER, setup });
	// 用户数据初始化
	useInterval(st.changeUserCount, state.userTime);

	React.useEffect(() => {
		if (state.initStatus) {
			st.changeUserTime();
		}
	}, [state.initStatus]);

	React.useEffect(() => {
		mr.getUserInfo();
	}, []);
	// 加载完成跳转
	React.useEffect(() => {
		if (state.progress >= 100) {
			navigate(_HOME);
		}
	}, [state.progress]);

	return (
		<div className={css.initialize}>
			<div className={css.percentage}>
				<span className={css.text}>初始化中...</span>
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
