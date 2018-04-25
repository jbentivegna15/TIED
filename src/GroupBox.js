//GroupBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from './forms/GroupForm';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from './Auth/AuthService';
import { Link } from 'react-router-dom';
import { getUserIdentifier } from './Auth/AuthService'

class GroupBox extends Component {
      constructor(props) {
          super(props);
          this.state = { submitted: false };
          this.handleGroupSubmit = this.handleGroupSubmit.bind(this);
      }
      handleGroupSubmit(group) {
          group.id = Date.now();
          getUserIdentifier(function(userId){
            group.admins = [userId];
            axios.post(this.props.url, group)
                .then(res => {
                  this.setState({ submitted: true });
                })
                .catch(err => {
                    console.error(err);
                });
          }.bind(this))
      }
      render() {
          return (
            isLoggedIn() ? (
//page formatting
              <div className="divFont divCenter">
                <h1><Link to='/'>TIED</Link></h1>
                <h2>Create Group</h2>
                <GroupForm onGroupSubmit={ this.handleGroupSubmit }/>
                {this.state.submitted ?
                  (<Redirect to={{
                    pathname: '/groupList',
                    state: { from: this.props.location }
                  }} />)
                  : null}
              </div>
            ) : (
              <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
              }} />
            )
          )
      }
  }

  export default GroupBox;
