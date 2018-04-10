import React from 'react';
import { Link } from 'react-router-dom';
import isAuthenticated from './Auth/isAuthenticated';

const Header = () => (
  <header>
    <nav>
      <ul>
        {
          !isAuthenticated() && (
            <li><Link to='/login'>Login</Link></li>
          )
        }
        {
          isAuthenticated() && (
            <div>
            <li>
              <Link to='/logout'>Logout</Link>
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
