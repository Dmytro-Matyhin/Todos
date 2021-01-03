import React from 'react';
import './input.scss'

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input 
        className="input"
        type="text"
        placeholder="What need to be done?"
        value={this.props.inputValue}
        onChange={this.props.handleChange}
      />
    )
  }
}

export default Input