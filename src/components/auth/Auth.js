/**
 * 根据权限，判断是否需要显示元素
 * <Auth access="example">
 * 		<Button>添加</Button>
 * </Auth>
 */

import React from 'react'
import PropTypes from 'prop-types'

function Auth(props) {
	// authFn是一个函数，将用户信息中的权限数组与props.access作比较
	if (authFn(props.access)) {
		return props.children
	}
	return props.placeholder
}

Auth.propTypes = {
	access: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	placeholder: PropTypes.any
}

export default React.memo(Auth)
