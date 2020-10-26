/**
 * 权限路由，使用方法与React-Router一致
 */

import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import ErrorPage from '../error-page'

function AuthRoute({ component: Component, access, render, ...rest }) {
	return (
		<Route
			{...rest}
			render={props => {
				if (app.authFn(access)) {
					// 如果有render方法，则渲染控制交给上层，否则渲染传入来的Component
					return render ? render(props) : <Component {...props} />
				}
				return (
					<Route component={() => <ErrorPage code={403} button={null} />} />
				)
			}}
		/>
	)
}

AuthRoute.propTypes = {
	component: PropTypes.func,
	path: PropTypes.string.isRequired,
	render: PropTypes.func,
	//单个权限传具体权限值，多个则传权限值数组
	access: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}

export default React.memo(AuthRoute)
