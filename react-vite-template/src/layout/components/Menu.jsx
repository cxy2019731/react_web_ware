import ItemMenu from './ItemMenu';
import { Menu as AntdMenu } from 'antd';
import useConcent from 'useConcent';
import { _SETTINGS } from 'cstMod';
import { useMemo, memo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import classs from 'classnames';
const { SubMenu } = AntdMenu;
function setup(ctx) {
	const { setState: st } = ctx;
	const state = ctx.initState({
		theme: 'light', //light | dark
		style: {
			height: '100vh',
		},
	});
	return { state };
}

function Menu(props) {
	const { menus = [] } = props;
	const {
		state: { openKeys, selectedKeys, inlineIndent, inlineCollapsed, mode, multiple, selectable, theme, style },
		mr,
	} = useConcent({ module: _SETTINGS, setup });
	const attrProps = useMemo(() => {
		const nowProps = { openKeys, selectedKeys, inlineIndent, mode, multiple, selectable, theme, style };
		if (mode === 'inline') {
			nowProps.inlineCollapsed = inlineCollapsed;
		} else if (mode === 'vertical') {
			nowProps.triggerSubMenuAction = 'click';
		}
		return nowProps;
	}, [openKeys, selectedKeys, inlineIndent, inlineCollapsed, mode, multiple, selectable, theme, style]);

	// 点击菜单项触发
	const onMenuItemClick = ({ item, key, keyPath, domEvent }) => {};

	// subMenu展开关闭触发
	const onSubMenuOpenChange = (openKeys) => {
		mr.openKeysChange(openKeys);
	};

	// 选中时调用
	const onMenuItemSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {};

	// 生成菜单项
	const createMenuItemNodes = (list) => list.map((item, index) => <ItemMenu {...item} key={item.key || uuidV4()} />);

	return (
		<AntdMenu
			{...attrProps}
			onClick={onMenuItemClick}
			onSelect={onMenuItemSelect}
			onOpenChange={onSubMenuOpenChange}
			className={classs({
				siderOpen: inlineCollapsed,
				siderShut: !inlineCollapsed,
			})}>
			{/* {createMenuItemNodes(menus)} */}
			<AntdMenu.Item key='1'>Option 1</AntdMenu.Item>
			<AntdMenu.Item key='2'>Option 2</AntdMenu.Item>
			<AntdMenu.Item key='3'>Option 3</AntdMenu.Item>
			<AntdMenu.Item key='4'>Option 4</AntdMenu.Item>
			<SubMenu key='sub1' title='Navigation One'>
				<AntdMenu.Item key='51'>Option 1</AntdMenu.Item>
				<AntdMenu.Item key='27'>Option 2</AntdMenu.Item>
				<AntdMenu.Item key='35'>Option 3</AntdMenu.Item>
				<AntdMenu.Item key='412'>Option 4</AntdMenu.Item>
			</SubMenu>
			<AntdMenu.Item key='6'>Option 4</AntdMenu.Item>
			<SubMenu key='sub2' title='Navigation 2ne'>
				<AntdMenu.Item key='3514361'>Option 1</AntdMenu.Item>
				<AntdMenu.Item key='35144361'>Option 2</AntdMenu.Item>
				<AntdMenu.Item key='351443461'>Option 3</AntdMenu.Item>
				<AntdMenu.Item key='3514434641'>Option 4</AntdMenu.Item>
			</SubMenu>
		</AntdMenu>
	);
}

export default memo(Menu);
