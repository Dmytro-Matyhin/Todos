import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/input.scss'

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.inputValue === nextProps.inputValue) {
      return false
    }
    return true
  }

  render() {
    return (
      <input 
        className="input"
        type="text"
        placeholder="What should be done?"
        value={this.props.inputValue}
        onChange={this.props.handleChange}
      />
    )
  }
}

Input.propTypes = {
  inputValue: PropTypes.string,
  handleChange: PropTypes.func,
}

export default Input