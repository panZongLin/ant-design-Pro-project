/**
 * 错误处理页面
 */

import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import styles from './ErrorPage.module.less'

const defaultButton = (
	<a href="/">
		<Button type="primary">
			<span>返回首页</span>
		</Button>
	</a>
)

const msg = {
	403: {
		message: '抱歉，你无权访问该页面',
		img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg'
	},
	404: {
		message: '抱歉，你访问的页面不存在',
		img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg'
	},
	500: {
		message: '抱歉，服务器出错了',
		img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg'
	}
}

function ErrorPage({ code = 500, message, button = defaultButton }) {
	const info = msg[code]
	return (
		<DocumentTitle title={message || info.message}>
			<div className={styles.exception}>
				<div className={styles.imgBlock}>
					<div
						className={styles.imgEle}
						style={{ backgroundImage: `url(${info.img})` }}
					/>
				</div>
				<div className={styles.content}>
					<h1>{code}</h1>
					<div className={styles.desc}>{message || info.message}</div>
					<div>{button}</div>
				</div>
			</div>
		</DocumentTitle>
	)
}

ErrorPage.propTypes = {
	code: PropTypes.number,
	message: PropTypes.string,
	button: PropTypes.node
}

export default React.memo(ErrorPage)
