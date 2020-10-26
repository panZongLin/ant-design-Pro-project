import React, { Component } from 'react'

const Hoc = (WrappedComponent) => {
	return class extends Component {
		render() {
			return <WrappedComponent {...this.props} />
		}
	}
}

export default Hoc
