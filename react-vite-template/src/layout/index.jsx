import Menu from './components/Menu';
function LayoutView(props) {
	const menus = [
		{
			title: '菜单一',
		},
		{
			title: '菜单二',
			children: [
				{
					title: '菜单二-1',
					children: [
						{
							title: '菜单二-1-1',
						},
						{
							title: '菜单二-1-2',
						},
						{
							title: '菜单二-1-3',
						},
					],
				},
				{
					title: '菜单二-2',
				},
				{
					title: '菜单二-3',
				},
				{
					title: '菜单二-4',
				},
			],
		},
		{
			title: '菜单三',
		},
		{
			title: '菜单四',
		},
		{
			title: '菜单五',
		},
		{
			title: '菜单六',
		},
		{
			title: '菜单七',
		},
		{
			title: '菜单八',
		},
	];
	return (
		<div className='fullScreen'>
			<Menu menus={menus} />
		</div>
	);
}

export default LayoutView;
