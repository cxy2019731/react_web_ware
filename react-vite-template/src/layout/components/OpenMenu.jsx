import { Icon } from '@components';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { _CC_SETTINGS, _ROUTER_IFRAME } from '@constant';
import css from './OpenMenu.module.css';
import { openNewPage } from '@utils';
import { useNavigate } from 'react-router-dom';

function OpenMenu(props) {
	const navigate = useNavigate();
	const { menus = [], style = {}, openMenuKeys = [], zIndex = 0, matchMenu = {}, openMenu } = props;
	if (!menus.length) {
		return null;
	}

	const itemContent = (item, isChild = false) => (
		<>
			<span className={css.menu_item_left}>
				<span className={css.menu_item_icon}>{zIndex > 0 ? null : <Icon type={item.icon} size={12} />}</span>
				<span className={css.menu_item_title}>{item.title || item.name}</span>
			</span>
			{isChild ? (
				<span className={css.menu_item_arrow}>
					<Icon type='icon-chevron-right' />
				</span>
			) : null}
		</>
	);

	const renderLink = (item) => {
		if (item.href && item.blank) {
			return (
				<span style={{ paddingLeft: zIndex * 22.5 }} className={css.menu_item_default} onClick={() => openNewPage(item.href)}>
					{itemContent(item)}
				</span>
			);
		} else if (item.href) {
			return (
				<span
					onClick={() => navigate(`/${_ROUTER_IFRAME}${item.href.split('.')[1]}`, { state: { url: item.href } })}
					className={classnames({
						[css.menu_item_default]: true,
						[css.menu_item_active]: matchMenu ? matchMenu.id === item.id : false,
					})}
					style={{ paddingLeft: zIndex * 22.5 }}>
					{itemContent(item)}
				</span>
			);
		} else {
			return (
				<Link
					to={item.path || ''}
					className={classnames({
						[css.menu_item_default]: true,
						[css.menu_item_active]: matchMenu ? matchMenu.id === item.id : false,
					})}
					style={{ paddingLeft: zIndex * 22.5 }}>
					{itemContent(item)}
				</Link>
			);
		}
	};

	const renderMenuItem = (list) =>
		list.map((item, index) => {
			const isChild = item.children && item.children.length;

			const isOpen = isChild ? openMenuKeys.includes(item.id) : false;

			return (
				<li className={css.menu_item} key={item.id}>
					{isChild ? (
						<>
							<span
								onClick={() => openMenu([item.id])}
								className={classnames({
									[css.menu_item_more]: true,
									[css.menu_item_open]: !!isOpen,
								})}
								style={{ paddingLeft: zIndex * 22.5 }}>
								{itemContent(item, isChild)}
							</span>
							<OpenMenu
								menus={item.children || []}
								style={{ display: isOpen ? 'block' : 'none' }}
								zIndex={zIndex + 1}
								matchMenu={matchMenu || {}}
								openMenu={openMenu}
								openMenuKeys={openMenuKeys}
							/>
						</>
					) : (
						renderLink(item)
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
