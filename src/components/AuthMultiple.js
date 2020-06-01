/**
 * @description 根据access数组，同时判断多个权限，access和children的数组长度要一致
 * <Auth
 *   access={[
 *     'hasSpanEl',
 *     'hasDivEl'
 *   ]}
 *   join={<span>join text</span>}
 * >
 *   <span>text1</span>
 *   <div>text2</div>
 * </Auth>
 * => (
 *   <span>text1</span>
 *   <span>join text</span>
 *   <div>text2</div>
 * )
 */

import React from 'react'
import PropTypes from 'prop-types'
import app from 'src/app'

function AuthMultiple(props) {
  let nodes = []
  for (let i = 0; i < props.access.length; i++) {
    if (app.auth(props.access[i]) && props.children[i]) {
      if (props.join && nodes.length !== 0) {
        nodes.push(
          React.cloneElement(props.join, {
            key: i
          })
        )
      }
      nodes.push(props.children[i])
    }
  }
  return nodes
}

AuthMultiple.propTypes = {
  access: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
  join: PropTypes.any
}

export default React.memo(AuthMultiple)
