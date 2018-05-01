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
    await this.setState({ name: response.data.firstname.concat(" ", response.data.lastname, "\n") })
  }
  render() {
    return (
        <div className="divFont" style={{padding: "10px"}}>
          <h2>Admin Requests</h2>
          <div className="attList">
            {this.state.name}
          </div>
          <div>
            <button className="smallButton" onClick={ this.acceptAdmin }> accept </button>
            <button className="smallButton" onClick={ this.rejectAdmin }> reject </button>
          </div>
        </div>
      )
  }
}

export default Admin;
