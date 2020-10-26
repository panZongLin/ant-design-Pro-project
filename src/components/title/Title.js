/**
 * 设置页面title
 */

import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

function Title(props) {
	return (
		<DocumentTitle title={props.title + ' - XXXXXXXXXX'}>
			{props.children}
		</DocumentTitle>
	)
}

Title.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired
}

export default Title
