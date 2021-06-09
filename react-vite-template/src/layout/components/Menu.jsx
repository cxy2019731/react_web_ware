import { Icon } from '@components';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { _USER } from '@constant';
import css from './Menu.module.css';
function Menu(props) {
	const { moduleState: ms, mr } = useConcent({ module: _USER });
	const { menus = ms.menus, style = {}, zIndex = 0, matchMenu = {} } = props;
	if (!menus.length) {
		return null;
	}
	const renderMenuItem = (list) =>
		list.map((item, index) => {
			// 是否有子集
			const isChild = item.children && item.children.length;
			// 是否展开
			const isOpen = isChild ? ms.openMenuKeys.includes(item.key) : false;
			const itemContent = (
				<>
					<span className={css.menu_item_left}>
						{zIndex > 0 ? null : (
							<span className={css.menu_item_icon}>
								<Icon type={item.icon} />
							</span>
						)}
						<span className={css.menu_item_title} style={{ marginLeft: (zIndex + 1) * 20 }}>
							{item.title || item.name}
						</span>
					</span>
					{isChild ? (
						<span className={css.menu_item_arrow}>
							<Icon type='icon-chevron-right' />
						</span>
					) : null}
				</>
			);
			return (
				<li className={css.menu_item} key={item.key}>
					{isChild ? (
						<>
							<span
								onClick={() => mr.openMenu([item.key])}
								className={classnames({
									[css.menu_item_more]: true,
									[css.menu_item_open]: !!isOpen,
								})}>
								{itemContent}
							</span>
							<Menu
								menus={item.children || []}
								style={{ display: isOpen ? 'block' : 'none' }}
								zIndex={zIndex + 1}
								matchMenu={matchMenu}
							/>
						</>
					) : (
						<Link
							to={item.path || ''}
							className={classnames({ [css.menu_item_default]: true, [css.menu_item_active]: matchMenu.key === item.key })}>
							{itemContent}
						</Link>
					)}
				</li>
			);
		});
	return (
		<ul className={css.menu} style={{ ...style, background: `rgba(0,0,0,.${zIndex})` }}>
			{renderMenuItem(menus)}
		</ul>
	);
}
export default React.memo(Menu);
