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
          this.handleGroupSubmit = this.handleGroupSubmit.bind(this);
      }
      handleGroupSubmit(group) {
          group.id = Date.now();
          getUserIdentifier(function(userId){
            group.admins = [userId];
            axios.post(this.props.url, group)
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
