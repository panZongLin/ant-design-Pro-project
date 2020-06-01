//限制字符串显示，完整字符串由Tooltip展示

import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

function LimitString(props) {
  const { value, children } = props
  if (children.length > value) {
    const clipText = children.substr(0, value) + '...'
    return 
        <Tooltip title={children}>
            {clipText}
        </Tooltip>
  }
  return children
}

LimitString.propTypes = {
  value: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired
}

export default React.memo(LimitString)
