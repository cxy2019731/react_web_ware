function Icon(props) {
	const { type = '', color = '', size = 14, style = {}, className = '', onClick = null, onDoubleClick = null } = props;

	return (
		<i
			className={`iconfont ${type} ${className}`}
			style={{
				...style,
				color: color || style.color || '',
				fontSize: size || style.size || '',
			}}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
		/>
	);
}
export default React.memo(Icon);
