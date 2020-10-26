import { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const rootdom = document.getElementById('root')

class Protal extends Component {
	static propTypes = {
		children: PropTypes.element
	}

	constructor(props) {
		super(props)
		this.el = document.createElement('div')
	}

	componentDidMount() {
		rootdom.appendChild(this.el)
	}

	componentWillUnmount() {
		rootdom.removeChild(this.el)
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.el)
	}
}

export default Protal
