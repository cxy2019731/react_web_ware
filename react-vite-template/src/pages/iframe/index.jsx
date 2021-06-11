import Iframe from 'react-iframe';
import { useLocation } from 'react-router-dom';
function IframeView(props) {
	const location = useLocation();
	return (
		<>
			{location?.state?.url ? (
				<div
					style={{
						width: '100%',
						height: '100%',
					}}>
					<Iframe
						url={location.state.url}
						width='100%'
						height='100%'
						id='iframeId'
						className='iframeClass'
						display='initial'
						position='relative'
						frameBorder={0}
					/>
				</div>
			) : null}
		</>
	);
}

export default IframeView;
