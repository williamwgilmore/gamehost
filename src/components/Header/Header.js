import React from 'react'
import { Link } from 'react-router'
import './Header.css'

const Header = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
  <nav className = 'navbar navbar-default'>
    <div className = 'container'>
      <div className = 'row'>
        <div className = 'col-md-9'>
          <h1><Link to='/'>GameHost</Link></h1>
          <ul className="list-inline">
            <li><Link className = 'head' to='/about'>About</Link></li>
          </ul>
        </div>
        <div className = 'col-md-3'>
          { !isAuthenticated ? (
            <button onClick={onLoginClick}>Login</button>
          ) : (
            <div>
              <img src={profile.picture} height="40px" />
              <span>   Welcome, {profile.nickname}   </span>
              <button onClick={onLogoutClick}>Logout</button>
            </div>
          )}
          { error &&
            <p>{error}</p>
          }
        </div>
      </div>
    </div>
  </nav>

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default Header
