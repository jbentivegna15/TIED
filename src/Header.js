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
              <Link to='/groupList' className="loggedHeader">View Groups List</Link>
<<<<<<< HEAD
              <Link to='/creategroup' className="loggedHeader">Create a Group</Link>
=======
              <Link to='/createGroup' className="loggedHeader">Create a Group</Link>
>>>>>>> c49c77e6a8a38480002fb58ec45391ff6baa41d0
            </div>
          )
        }
      </div>
    </nav>
  </header>
)

export default Header;
