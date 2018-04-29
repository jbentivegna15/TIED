//Admin.js
import React, { Component } from 'react';
import axios from 'axios';
import { APICONST } from './urlConst'
import { link } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state={ name: '' }
    this.acceptAdmin = this.acceptAdmin.bind(this);
    this.rejectAdmin = this.rejectAdmin.bind(this);
  }
  acceptAdmin(e) {
    e.preventDefault();
    this.props.onAdminAccept(this.props.adminId);
  }
  rejectAdmin(e) {
    e.preventDefault();
    this.props.onAdminDecline(this.props.adminId);
  }
  async componentDidMount() {
    const id = await this.props.adminId
    const response = await axios.get(`${APICONST}/users/${id}`);
    await this.setState({ name: response.data.firstname.concat(" ", response.data.lastname, " ") })
  }
  render() {
    return (
        <div>
          {this.state.name}
          <div>
            <a style={{ color: 'blue' }} href='foo' onClick={ this.acceptAdmin }> accept </a>
            <a style={{ color: 'red' }} href='foo' onClick={ this.rejectAdmin }> reject </a>
          </div>
        </div>
      )
  }
}

export default Admin;
