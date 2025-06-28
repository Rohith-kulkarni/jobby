import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navigator">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div>
        <ul className="links-list">
          <li>
            <Link className="links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="links" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button type="button" onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
