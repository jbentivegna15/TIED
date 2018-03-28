import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class User extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      name: '',
      password: ''
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }
  updateUser(e) {
    e.preventDefault();

    this.setState({ toBeUpdated: !this.state.toBeUpdated});
  }
  handleUserUpdate(e){
    e.preventDefault();
    let id = this.props.uniqueID;
    let name = (this.state.name) ? this.state.name : null;
    let password = (this.state.password) ? this.state.password : null;
    let user = {name : name, password: password};
    this.props.onUserUpdate(id, user);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      user: '',
      password: ''
    })
  }
  deleteUser(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onUserDelete(id);
    console.log('user deleted');
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ user: e.target.value });
  }
}

export default User;
