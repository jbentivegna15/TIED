//UserBox.js
import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './forms/UserForm';
import style from './style';

class UserBox extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
      }
      handleUserSubmit(user) {
        axios.get(`${this.props.url}/${user.user}`)
          .then(res => {
              this.setState({ name: res.user });
          })
        if(this.state.name === user.user){
          return;
        }

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
            <UserForm onUserSubmit={this.handleUserSubmit }/>
            </div>
          )
      }
  }

  export default UserBox;
