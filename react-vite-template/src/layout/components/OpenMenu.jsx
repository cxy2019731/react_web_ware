import { Icon } from '@components';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { _SETTINGS } from '@constant';
import css from './OpenMenu.module.css';

function OpenMenu(props) {
	const { moduleState: ms, mr } = useConcent({ module: _SETTINGS });
	const { menus = ms.menus, style = {}, zIndex = 0, matchMenu = {} } = props;
	if (!menus.length) {
		return null;
	}
	const renderMenuItem = (list) =>
		list.map((item, index) => {
			// 是否有子集
			const isChild = item.children && item.children.length;

			// 是否展开
			const isOpen = isChild ? ms.openMenuKeys.includes(item.id) : false;
			const itemContent = (
				<>
					<span className={css.menu_item_left}>
						<span className={css.menu_item_icon}>{zIndex > 0 ? null : <Icon type={item.icon} />}</span>
						<span className={css.menu_item_title}>{item.title || item.name}</span>
					</span>
					{isChild ? (
						<span className={css.menu_item_arrow}>
							<Icon type='icon-chevron-right' />
						</span>
					) : null}
				</>
			);
			return (
				<li className={css.menu_item} key={item.id}>
					{isChild ? (
						<>
							<span
								onClick={() => mr.openMenu([item.id])}
								className={classnames({
									[css.menu_item_more]: true,
									[css.menu_item_open]: !!isOpen,
								})}
								style={{ paddingLeft: zIndex * 22.5 }}>
								{itemContent}
							</span>
							<OpenMenu
								menus={item.children || []}
								style={{ display: isOpen ? 'block' : 'none' }}
								zIndex={zIndex + 1}
								matchMenu={matchMenu || {}}
							/>
						</>
					) : (
						<Link
							to={item.path || ''}
							className={classnames({
								[css.menu_item_default]: true,
								[css.menu_item_active]: matchMenu ? matchMenu.id === item.id : false,
							})}
							style={{ paddingLeft: zIndex * 22.5 }}>
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
export default React.memo(OpenMenu);
