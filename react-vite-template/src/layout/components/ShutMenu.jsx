import css from './ShutMenu.module.css';
import { _CC_SETTINGS } from '@constant';
import { Icon } from '@components';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { useHover, useUpdateEffect } from 'ahooks';

const setup = (ctx) => {
	const st = {
		mouseVerHandler: (event, item) => {
			try {
				if (item?.children?.length) {
					const { right, top } = event.currentTarget.getBoundingClientRect();
					ctx.emit('_sider_float_menu_coods', {
						top,
						left: right,
						...item,
					});
				} else {
					st.set_floatMenuData();
				}
			} catch (err) {
				st.set_floatMenuData();
			}
		},
		set_floatMenuData: (val) => ctx.emit('_sider_float_menu_coods', val || null),
	};

	return st;
};

function ShutMenu(props) {
	const { settings: st } = useConcent({ setup, props });
	const { menus = [], matchMenu = {}, cbHover } = props;

	const refMenu = React.useRef(null);
	const isHover = useHover(refMenu);

	useUpdateEffect(() => {
		cbHover && cbHover(isHover);
	}, [isHover]);

	const renderMenuList = (list) =>
		list.map((item, index) => (
			<li className={css.menu_item} key={item.id} onMouseOver={(e) => st.mouseVerHandler(e, item)}>
				{item?.children?.length ? (
					<>
						<span className={css.menu_item_default}>
							<Icon type={item.icon} />
						</span>
					</>
				) : (
					<Tooltip placement='right' title={item.title || item.name}>
						<Link
							to={item.path || ''}
							className={classnames({
								[css.menu_item_default]: true,
								[css.menu_item_active]: matchMenu?.id === item.id,
							})}>
							<Icon type={item.icon} />
						</Link>
					</Tooltip>
				)}
			</li>
		));

	return <ul ref={refMenu} className={classnames({ [css.menu]: true })}>{renderMenuList(menus)}</ul>;
}
export default React.memo(ShutMenu);
