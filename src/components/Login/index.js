import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    errorMsg: '',
    username: '',
    password: '',
    showError: false,
  }

  userNameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const bodyDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(bodyDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const message = data.error_msg
      this.setState({showError: true, errorMsg: message})
    }
  }

  render() {
    const {errorMsg, username, password, showError} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.userNameChange}
            />
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-element"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.passwordChange}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-display">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
