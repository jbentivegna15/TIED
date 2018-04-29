//UserList.js
import React, { Component } from 'react';
import axios from 'axios';
import Admin from "./Admin";
import { APICONST } from './urlConst'

class AdminList extends Component {
    constructor(props) {
      super(props);
      this.renderAdmins = this.renderAdmins.bind(this);
    }
    renderAdmins(){
      return this.props.data.rqadmins.map(admins => {
          return (
                  <Admin
                    adminId={ admins }
                    onAdminAccept={ this.props.onAdminAccept }
                    onAdminDecline={ this.props.onAdminDecline}>
                  </Admin>
                )
           })
    }
    render() {
  		return(
  				this.renderAdmins()
  			)
  	}
}
export default AdminList;
