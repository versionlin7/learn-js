import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  static contextType = Store
  
  constructor () {
    super()
    this.state = { themeColor: '' }
  }
  componentWillMount () {
    this._updateThemeColor()
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  render () {
    return (
      <h1>React.js 小书</h1>
    )
  }
}

export default Header