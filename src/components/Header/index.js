import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {MdHome, MdWork} from 'react-icons/md'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const removeAccess = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="main-header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-website-logo"
          alt="website logo"
        />
      </Link>
      <div className="lg-container">
        <ul className="lg-list">
          <li className="header-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="header-item">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
          <li className="header-item">
            <button
              type="submit"
              className="header-logout-button"
              onClick={removeAccess}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="sm-container">
        <ul className="sm-list">
          <li className="sm-list-item">
            <Link to="/">
              <MdHome className="icons" />
            </Link>
          </li>
          <li className="sm-list-item">
            <Link to="/jobs">
              <MdWork className="icons" />
            </Link>
          </li>
          <li className="sm-list-item">
            <button
              type="submit"
              className="button-icon"
              onClick={removeAccess}
            >
              <FiLogOut className="icons" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
