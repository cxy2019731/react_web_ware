import css from './FloatMenu.module.css';
import { Link } from 'react-router-dom';
import { Icon } from '@components';
import { useHover } from 'ahooks';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { _ROUTER_IFRAME } from '@constant';
import { openNewPage } from '@utils';

function setup(ctx) {
	ctx.initState({
		floatItemData: null,
	});
	const st = {
		onMouseOverMenu: (event, item) => {
			try {
				if (item?.children?.length) {
					const { top, right } = event.currentTarget.getBoundingClientRect();
					st.set_floatItemData({
						left: right,
						top,
						...item,
					});
				} else {
					st.set_floatItemData();
				}
			} catch (err) {
				st.set_floatItemData();
			}
		},
		set_floatItemData: (val) => ctx.setState({ floatItemData: val || null }),
		onEnter: (e) => {
			// console.log(e);
		},
		onLeave: (e) => {
			// console.log(e);
		},
	};
	return st;
}

function FloatMenu(props) {
	const navigate = useNavigate();
	const { state, settings: st } = useConcent({ setup, props });
	const { top, left, icon, title, name, children, matchMenu, zIndex = 0, rootMenuIsHover = true } = props;

	const refMenu = React.useRef(null);
	const isHover = useHover(refMenu, {
		onEnter: st.onEnter,
		onLeave: st.onLeave,
	});

	const renderLink = (item) => {
		if (item.href && item.blank) {
			return (
				<span className={css.menu_item_link} onClick={() => openNewPage(item.href)}>
					{item.title || item.name || ''}
				</span>
			);
		} else if (item.href) {
			return (
				<span
					onClick={() => navigate(`/${_ROUTER_IFRAME}${item.href.split('.')[1]}`, { state: { url: item.href } })}
					className={classnames({
						[css.menu_item_link]: true,
						[css.menu_item_active]: matchMenu ? matchMenu.id === item.id : false,
					})}>
					{item.title || item.name || ''}
				</span>
			);
		} else {
			return (
				<Link
					to={item.path || ''}
					className={classnames({
						[css.menu_item_link]: true,
						[css.menu_item_active]: matchMenu?.id === item.id,
					})}>
					{item.title || item.name || ''}
				</Link>
			);
		}
	};

	return (
		<div
			ref={refMenu}
			className={css.menu_float}
			style={{ top, left, display: zIndex === 0 ? (rootMenuIsHover || isHover ? 'block' : 'none') : 'block' }}>
			<div>
				<div className={css.title}>
					<span className={css.menu_title_name}>
						{!zIndex ? <Icon type={icon} /> : null}
						<span
							className={classnames({
								[css.menuMrl20]: !!zIndex,
							})}>
							{title || name | ''}
						</span>
					</span>
					<span className={css.menu_title_arrow}>
						<Icon type='icon-chevron-right' />
					</span>
				</div>
				{children?.length ? (
					<ul className={css.menu_lsit}>
						{children.map((item, index) => (
							<li className={css.menu_item} key={item.id} onMouseOver={(e) => st.onMouseOverMenu(e, item)}>
								{item?.children?.length ? (
									<span className={css.menu_item_link}>
										<span>{item.title || item.name || ''}</span>
										<span className={css.menu_item_arrow}>
											<Icon type='icon-chevron-right' />
										</span>
									</span>
								) : (
									renderLink(item)
								)}
							</li>
						))}
					</ul>
				) : null}
			</div>
			{state.floatItemData && isHover ? <FloatMenu {...state.floatItemData} matchMenu={matchMenu} zIndex={zIndex + 1} /> : null}
		</div>
	);
}

export default React.memo(FloatMenu);
