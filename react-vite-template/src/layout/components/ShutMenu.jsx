import css from './ShutMenu.module.css';
import { _SETTINGS } from '@constant';
import { Icon } from '@components';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { useEventListener } from 'ahooks';

const setup = (ctx) => {
	const { setState } = ctx;
	/**
	 * 状态初始化
	 */
	ctx.initState({});
	// 方法集合
	const st = {
		mouseVerHandler: (event) => {
			console.log(event);
		},
	};

	return st;
};

function ShutMenu(props) {
	const { moduleState: ms, mr, settings: st } = useConcent({ module: _SETTINGS, setup, props });
	const { menus = ms.menus, matchMenu = {} } = props;
	const refMenu = React.useRef(null);
	useEventListener('mouseover', st.mouseVerHandler, { target: refMenu });

	const renderMenuList = (list) =>
		list.map((item, index) => (
			<li className={css.menu_item} key={item.id}>
				{item?.children?.length ? (
					<>
						<span className={css.menu_item_default}>
							<Icon type={item.icon} />
						</span>
						<FloatMenu matchMenu={matchMenu} {...item} />
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

	return (
		<ul className={classnames({ [css.menu]: true })} ref={refMenu}>
			{renderMenuList(menus)}
		</ul>
	);
}
export default React.memo(ShutMenu);

function FloatMenu(props) {
	const { left, top, title, name, children, matchMenu } = props;

	return (
		<div className={css.menu_float}>
			<div>{title || name | ''}</div>
			{children?.length ? (
				<ul>
					{children.map((item, index) => (
						<li key={item.id}>{item.title || item.name || ''}</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
