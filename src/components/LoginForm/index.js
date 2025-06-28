import {useState} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'

import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = error => {
    setErrorMsg(error)
    setShowError(true)
  }

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  const onFormSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <form onSubmit={onFormSubmit}>
          <div className="inputs-container">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="inputs-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="btn-container">
            <button className="login-btn" type="submit" data-testid="">
              Login
            </button>
          </div>
          {showError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default withRouter(LoginForm)
