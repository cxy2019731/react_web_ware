/**
 * 外部依赖
 * 1.ahooks https://ahooks.gitee.io
 * 2.启用了css module特性
 * 3.不支持嵌套子表格-会出现布局错乱,若有必要,可自行修改getScrollHeight和getScrollWidth中dom的获取精细度,获取子元素,而不含孙子元素。
 * 4.自定义滑动条会出现X轴标题宽度布局错乱,这个主要原因在于滑动条的宽度和overflow-y不为scroll导致,宽度问题可见styles下的scrollbar样式处理方式，不为scroll问题是因为自己设置了其他属性，一般默认scroll，无需设置。
 * 5.getStyle和getStyleFullHeight方法可在utils方法集中获取到
 */
import { memo, useRef, useMemo } from "react";
import { Table, Divider, Button, Dropdown, Menu } from "antd";
import { useSize } from "ahooks";
import { DownOutlined, DeleteOutlined, EllipsisOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
/**
 * 撑满容器的 antd 表格
 * @param {object} props
 * 1.兼容antd官方表格所有参数。
 * 2.header ReactNode 额外自定义参数，表格顶部自定义内容区域,可放置搜索框等一系列内容
 * 3.headerStyle object 顶部内容自定义样式区域
 * 3.control object|null 自定义操作栏的显示
 *   ...={
 * 		   ...列的属性都支持，直接写
 *
 *         buttonProps: object 所有button的通用属性
 *         viewProps: object 查看按钮的属性
 *         editProps: object 修改按钮的属性
 *         deleteProps: object 删除按钮的属性
 *         moreProps: object 更多按钮的属性
 *         downProps: object 下拉菜单的属性
 *
 *         onViewClick: function 点击查看按钮
 *         onEditClick: function 点击编辑按钮
 *         onDeletetClick: function 点击删除按钮
 *         onDownClick: function 下拉菜单点击触发
 *
 *         downMenus: [{key,title,icon,disabled,danger}] 下拉菜单项
 *       }
 * @returns antd Table
 */
const FullTable = memo(props => {
	const {
		header = null,
		headerStyle = {},
		control = null,

		dataSource = [],
		pagination = {},
		bordered = false,
		columns = [],
		footer = null,
		size = "default",
		title = null,
		showHeader = true,
		scroll = {},
		...tableProps
	} = props;

	const tableBoxRef = useRef();
	const tableHeaderRef = useRef();

	const tableBoxSize = useSize(tableBoxRef);
	const tableHeaderSize = useSize(tableHeaderRef);

	const getScrollWidth = () => {
		let columnsBorder = 0;
		// 每列都会有1px的边框
		if (bordered) {
			columnsBorder = props?.columns?.length * 1;
		}

		return tableBoxSize.width - columnsBorder;
	};

	const getScrollHeight = () => {
		// 表格dom
		let tableDom = tableBoxRef.current.querySelector(".ant-table");
		// 分页高度
		let paginationDom = tableBoxRef.current.querySelector(".ant-pagination");
		let paginationHeight = paginationDom ? utils.getStyleFullHeight(paginationDom) : 0;
		// 表标题高度
		let tableTitle = tableBoxRef.current.querySelector(".ant-table-title");
		let tableTitleHeight = tableTitle ? utils.getStyleFullHeight(tableTitle) : 0;
		// 表尾高度
		let tableFooter = tableBoxRef.current.querySelector(".ant-table-footer");
		let tableTitleFooter = tableFooter ? utils.getStyleFullHeight(tableFooter) : 0;
		// 表格内容container
		let tableContaniner = tableBoxRef.current.querySelector(".ant-table-container");
		// 表头
		let tableHeader = tableContaniner.querySelector(".ant-table-header");
		let tableHeaderHeight = tableHeader ? utils.getStyleFullHeight(tableHeader) : 0;
		// 表体
		let tableBody = tableContaniner.querySelector(".ant-table-body");
		// 设置表格主体盖度：减去分页，减去footer，减去title，减去header
		let tableDomHeight = tableBoxSize.height - paginationHeight - tableHeaderSize?.height || 0;
		// 设置最外层高度
		tableDom.style.height = tableDomHeight + "px";
		let tableContaninerHeight = tableDomHeight - tableTitleHeight - tableTitleFooter;
		// 设置表格conaniner高度
		tableContaniner.style.height = tableContaninerHeight + "px";
		// 设置表格内容高度
		tableBody.style.height = tableContaninerHeight - tableHeaderHeight + "px";

		return tableContaninerHeight - tableHeaderHeight;
	};

	const scrollProps = useMemo(() => {
		let nowScroll = {
			scrollToFirstRowOnChange: true,
			...scroll,
			x: 0,
			y: 0
		};
		if (tableBoxRef?.current) {
			nowScroll.x = getScrollWidth() || 0;
			nowScroll.y = getScrollHeight() || 0;
		}
		return nowScroll;
	}, [tableHeaderSize, tableBoxSize, bordered, footer, size, title, showHeader, scroll]);

	const paginationProps = useMemo(() => {
		return {
			total: pagination?.total || dataSource?.length,
			showQuickJumper: true,
			showSizeChanger: true,
			position: ["bottomCenter"],
			showTotal: (total, range) => {
				return (
					<span className={styles.custom_total}>
						共&nbsp;<b className={styles.custom_total_nums}>{total}</b>
						&nbsp;条数据 当前显示第 &nbsp;
						<b className={styles.custom_total_start}>{range[0]}</b>
						&nbsp;至&nbsp;
						<b className={styles.custom_total_end}>{range[1]}</b>&nbsp;条
					</span>
				);
			},
			...pagination
		};
	}, [pagination, dataSource]);

	const columnsProps = useMemo(() => {
		if (!control) {
			return [...columns];
		}
		const buttonProps = {
			type: "link",
			size: "small",
			...control?.buttonProps
		};
		const dividerProps = {
			type: "vertical",
			style: {
				marginLeft: 0,
				marginRight: 0
			}
		};

		const menu = control?.downMenus ? (
			<Menu onClick={(...args) => control?.onDownClick?.(...args)}>
				{control?.downMenus?.map(item => (
					<Menu.Item {...item}>{item.title}</Menu.Item>
				))}
			</Menu>
		) : (
			<span></span>
		);
		const controlCol = {
			title: control?.title || "操作",
			width: control?.width || control?.render ? "auto" : 250,
			align: control?.align || "center",
			fixed: control?.fixed || "right",
			render: (t, r, i) =>
				control?.render?.(t, r, i) || (
					<span className={styles.control}>
						<Button icon={<EyeOutlined />} {...buttonProps} {...control?.viewProps} onClick={() => control?.onViewClick?.(r)}>
							{control?.buttonProps?.title || "查看"}
						</Button>
						<Divider {...dividerProps} />
						<Button icon={<FormOutlined />} {...buttonProps} {...control?.editProps} onClick={() => control?.onEditClick?.(r)}>
							{control?.buttonProps?.title || "编辑"}
						</Button>
						<Divider {...dividerProps} />
						<Button
							danger
							icon={<DeleteOutlined />}
							{...buttonProps}
							{...control?.deleteProps}
							onClick={() => control?.onDeletetClick?.(r)}
						>
							{control?.buttonProps?.title || "删除"}
						</Button>
						<Divider {...dividerProps} />
						<Dropdown overlay={menu} {...control?.downProps}>
							<Button icon={<EllipsisOutlined />} {...buttonProps} {...control?.moreProps} onClick={e => e.preventDefault()}>
								{control?.buttonProps?.title || "更多"}
								<DownOutlined />
							</Button>
						</Dropdown>
					</span>
				)
		};
		return [...columns, controlCol];
	}, [columns, control]);

	return (
		<div className={styles.table_box} ref={tableBoxRef}>
			{/* 头部工具栏 */}
			<div className={styles.table_header} style={headerStyle} ref={tableHeaderRef}>
				{header}
			</div>
			{/* 表格主体 */}
			<div className={styles.table_body}>
				<Table
					rowKey={row => row?.id || row?.key || row?.value}
					sticky
					{...tableProps}
					dataSource={dataSource}
					bordered={bordered}
					columns={columnsProps}
					footer={footer}
					size={size}
					title={title}
					showHeader={showHeader}
					pagination={paginationProps}
					scroll={scrollProps}
				/>
			</div>
		</div>
	);
});

export default FullTable;
