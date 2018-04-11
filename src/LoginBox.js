import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './forms/UserForm';
import style from './style';

class UserBox extends Component {
    constructor(props) {
        super(props);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      }
      handleLoginSubmit(user) {
        if (!this.state.user || !this.state.password) return;
        user.id = user.user;
        axios.post(this.props.url, user)
          .catch(err => {
            console.error(err);

          });

      }
      render() {
          return (
            <div>
            <h1 style={style.title}>TIED</h1>
            <h2 style={style.title}>REGISTERING</h2>
            <UserForm onLoginSubmit={this.handleLoginSubmit }/>
            </div>
                 )
      }
  }

  export default UserBox;
