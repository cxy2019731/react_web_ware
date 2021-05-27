import { memo } from 'react';
import { _USER } from '@constant';
/**
 * 授权判定
 * @param {object} props 参数
 * 		children?:正常渲染的内容
 * 		authority?:可访问权限组  array | string
 * 		noMatch?:不可访问渲染内容  null | node
 * @returns node | null
 */
function Authorized(props) {
	const { moduleState: ms } = useConcent({ module: _USER });
	const { children = null, authority, noMatch = '无权限' } = props;
	// currentAuthority需要放入角色key、权限key
	const currentAuthority = useMemo(() => [...ms.auths, ...ms.roles], [ms.auths, ms.roles]);

	if (!authority) return children;

	const __authority = Array.isArray(authority) ? authority : [authority];

	if (__authority.some((i) => currentAuthority.includes(i))) return children;

	return noMatch;
}

export default memo(Authorized);
