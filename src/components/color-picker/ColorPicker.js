/**
 * 颜色选择组件
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ChromePicker } from 'react-color'


class ColorPicker extends Component {
	static propTypes = {
		color: PropTypes.string,
		onChange: PropTypes.func
	}

	// static defaultProps = {
	//   color: 'rgba(0, 0, 0, 1)'
	// }

	static getDerivedStateFromProps(nextProps, prevState) {
		// state.value与nextProps的value比较，判断是否一致
		if (nextProps.color !== prevState.color) {
			return {
				color: nextProps.color
			}
		}
		return null
	}

	state = {
		color: this.props.color,
		displayColorPicker: false
	}

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker })
	}

	handleClose = () => {
		this.setState({ displayColorPicker: false })
	}

	handleChange = color => {
		const rgb = color.rgb
		const rgba = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`
		this.props.onChange(rgba)
	}

	render() {
		const style = {
			box: {
				display: 'inline-flex',
				alignItems: 'center'
			},
			swatch: {
				display: 'inline-block',
				padding: '5px',
				borderRadius: '1px',
				background: '#fff',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				cursor: 'pointer'
			},
			color: {
				width: '36px',
				height: '14px',
				borderRadius: '2px',
				background: this.state.color
			},
			popover: {
				position: 'absolute',
				left: 50,
				zIndex: '2'
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px'
			}
		}
		return (
			<div style={style.box}>
				<div style={style.swatch} onClick={this.handleClick}>
					<div style={style.color} />
				</div>
				{this.state.displayColorPicker &&
					<div style={style.popover}>
						<div style={style.cover} onClick={this.handleClose} />
						<ChromePicker
							color={this.state.color}
							onChange={this.handleChange}
						/>
					</div>
				}
			</div>
		)
	}
}

export default ColorPicker
