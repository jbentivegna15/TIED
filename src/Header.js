import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn, getUserIdentifier } from './Auth/AuthService';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: ''};
  }
  componentDidMount() {
    getUserIdentifier(function(res){
      this.setState({userId: res});
    }.bind(this));
  }
  render() {
    return(
      <header>
        <nav>
          <div className="divFont">
            {
              !isLoggedIn() && (
    //page formatting
              <div className="divFont divCenter">
                <button onClick={() => login()} className="loginStyle">Log In/Register</button>
                <div className="bottomHeader">
                  This website was made as a project for ECE-366 Software Engineering Course at Cooper Union under Julia Astrauckas.
                  The dev members are: Jeremiah Pratt, Joseph Bentivegna, Casey He, Daniel Park
                </div>
              </div>
              )
            }
            {
              isLoggedIn() && (
    //page formatting
                <div className="divFont">
                  <Link to='/' className="loggedHeader"><img src={ require('./img/logo.png') } className="navLogo"/></Link>
                  <Link to='/groupList' className="loggedHeader">View PODs List</Link>
                  <Link to='/createGroup' className="loggedHeader">Create a POD</Link>
                  <Link to={`/users/${this.state.userId}`} className="loggedHeader">View My Info</Link>
                  <button onClick={() => logout()} className="loggedStyle">Logout</button>
                  <div className="bottomHeader">
                    This website was made as a project for ECE-366 Software Engineering Course at Cooper Union under Julia Astrauckas.
                    The dev members are: Jeremiah Pratt, Joseph Bentivegna, Casey He, Daniel Park
                  </div>
                </div>
              )
            }
          </div>
        </nav>
      </header>
    )}
}

export default Header;
