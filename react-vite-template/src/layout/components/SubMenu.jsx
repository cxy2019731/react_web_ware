import { Menu } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import ItemMenu from './ItemMenu';
import { useMemo, memo } from 'react';
import FontIcon from 'FontIcon';

function SubMenu(props) {
	const { disabled = false, icon, title, popupClassName, popupOffset, onTitleClick, children } = props;

	const attrProps = useMemo(() => {
		return {
			disabled,
			icon: icon ? <FontIcon name={item.icon} /> : null,
			title,
			popupClassName,
			popupOffset,
			onTitleClick,
		};
	}, [disabled, icon, title, popupClassName, popupOffset, onTitleClick]);

	const childrenNodes = useMemo(() => {
		return children.map((item, index) => <ItemMenu {...item} key={item.key || uuidV4()} />);
	}, [children]);

	return <Menu.SubMenu {...attrProps} children={childrenNodes}></Menu.SubMenu>;
}

export default memo(SubMenu);
