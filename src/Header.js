import React from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from './Auth/AuthService';

const Header = () => (
  <header>
    <nav>
      <ul>
        {
          !isLoggedIn() && (
            <li><button onClick={() => login()}>Login</button></li>
          )
        }
        {
          isLoggedIn() && (
            <div>
            <li>
              <button onClick={() => logout()}>Logout</button>
            </li>
            <li>
              <Link to='/grouplist'>Groups</Link>
            </li>
            <li>
              <Link to='/creategroup'>Make a Group</Link>
            </li>
            </div>
          )
        }
      </ul>
    </nav>
  </header>
)

export default Header;
