import { Menu } from 'antd';
import FontIcon from 'FontIcon';
import SubMenu from './SubMenu';
import { useMemo, memo } from 'react';
const { Item } = Menu;

function ItemMenu(props) {
	const { danger = false, disabled = false, icon, title, children } = props;

	const isChildren = useMemo(() => {
		return children && !!children.length;
	}, [children]);

	const attrProps = useMemo(() => {
		return {
			danger,
			disabled,
			icon: icon ? <FontIcon name={item.icon} /> : null,
			title,
		};
	}, [danger, disabled, icon, title]);

	return <>{isChildren ? <SubMenu disabled={disabled} icon={icon} title={title} children={children} /> : <Item {...attrProps}>{title}</Item>}</>;
}

export default memo(ItemMenu);
