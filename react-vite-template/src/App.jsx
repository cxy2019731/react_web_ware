import { _CC_USER, _ROUTER_INITIALIZE, _ROUTER_LOGIN } from '@constant';
import { useNavigate } from 'react-router-dom';

export default (props) => {
	const navigate = useNavigate();

	const { moduleState: ms } = useConcent({ module: _CC_USER });

	React.useEffect(() => {
		if (ms.isLogin) {
			navigate(_ROUTER_INITIALIZE);
		} else {
			navigate(_ROUTER_LOGIN);
		}
	}, [ms.isLogin]);

	return props.children;
};
