import ccReducer from '@/base/ccReducer';
import { _GLOBAL } from 'cstMod';
import { useLocation } from 'react-router-dom';

export default (props) => {
	// test
	const _useLocation = useLocation();
	React.useEffect(() => {
		ccReducer[_GLOBAL].set_location({ ..._useLocation });
	}, [_useLocation]);

	return <>{props.children}</>;
};
