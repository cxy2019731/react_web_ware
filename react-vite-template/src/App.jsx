import { _USER, _INITIALIZE, _LOGIN } from '@constant';
import { useNavigate } from 'react-router-dom';

export default (props) => {
	const navigate = useNavigate();

	const { moduleState: ms } = useConcent({ module: _USER });

	React.useEffect(() => {
		if (ms.isLogin) {
			navigate(_INITIALIZE);
		} else {
			navigate(_LOGIN);
		}
	}, [ms.isLogin]);

	return props.children;
};
