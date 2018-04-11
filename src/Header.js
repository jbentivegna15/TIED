import React from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from './Auth/AuthService';

const Header = () => (
  <header>
    <nav>
      <div className="divFont">
        {
          !isLoggedIn() && (
          <div className="divCenter">
            <button onClick={() => login()} className="loginStyle">Log In/Register</button>
          </div>
          )
        }
        {
          isLoggedIn() && (
            <div>
              <button onClick={() => logout()} className="loggedStyle">Logout</button>
              <Link to='/grouplist' className="loggedHeader">View Groups List</Link>
              <Link to='/creategroup' className="loggedHeader">Create a Group</Link>
            </div>
          )
        }
      </div>
    </nav>
  </header>
)

export default Header;
