import css from './index.module.css';
import { v4 as uuidV4 } from 'uuid';
import TreeIndex from './components/Tree';

function Tree(props) {
	return (
		<div>
			<TreeIndex treeData={treeData} />
		</div>
	);
}

export default Tree;

const treeData = [
	{
		key: uuidV4(),
		title: `前端`,
		children: [
			{
				key: uuidV4(),
				title: `JavaScript`,
			},
			{
				key: uuidV4(),
				title: `html5`,
			},
			{
				key: uuidV4(),
				title: `css3`,
			},
			{
				key: uuidV4(),
				title: `react`,
			},
			{
				key: uuidV4(),
				title: `vue`,
			},
			{
				key: uuidV4(),
				title: `angular`,
			},
			{
				key: uuidV4(),
				title: `antd`,
			},
			{
				key: uuidV4(),
				title: `element`,
			},
			{
				key: uuidV4(),
				title: `微信小程序`,
			},
			{
				key: uuidV4(),
				title: `移动APP`,
			},
			{
				key: uuidV4(),
				title: `node`,
			},
			{
				key: uuidV4(),
				title: `koa`,
			},
		],
	},
	{
		key: uuidV4(),
		title: `后端`,
		children: [
			{
				key: uuidV4(),
				title: `java`,
			},
			{
				key: uuidV4(),
				title: `c#`,
			},
			{
				key: uuidV4(),
				title: `php`,
			},
			{
				key: uuidV4(),
				title: `c++`,
			},
			{
				key: uuidV4(),
				title: `ruby`,
			},
			{
				key: uuidV4(),
				title: `go`,
			},
			{
				key: uuidV4(),
				title: `antd`,
			},
		],
	},
	{
		key: uuidV4(),
		title: `嵌入式`,
		children: [
			{
				key: uuidV4(),
				title: `c`,
			},
			{
				key: uuidV4(),
				title: `linux`,
			},
			{
				key: uuidV4(),
				title: `c++`,
			},
		],
	},
	{
		key: uuidV4(),
		title: `驱动`,
		children: [
			{
				key: uuidV4(),
				title: `显卡`,
			},
			{
				key: uuidV4(),
				title: `CPU`,
			},
			{
				key: uuidV4(),
				title: `主板`,
			},
		],
	},
	{
		key: uuidV4(),
		title: `奥特曼`,
	},
];
