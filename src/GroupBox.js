//GroupBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupForm from './forms/GroupForm';
import style from './style';
import { Redirect } from 'react-router-dom';
import isAuthenticated from './Auth/isAuthenticated';

class GroupBox extends Component {
      constructor(props) {
          super(props);
          this.handleGroupSubmit = this.handleGroupSubmit.bind(this);
      }
      handleGroupSubmit(group) {
          group.id = Date.now();
          axios.post(this.props.url, group)
              .catch(err => {
                  console.error(err);
              });
      }
      render() {
          return (
            isAuthenticated() ? (
              <div>
              <h1 style={style.title}>TIED</h1>
              <h2 style={style.title}>Create Group</h2>
              <GroupForm onGroupSubmit={ this.handleGroupSubmit }/>
              </div>
            ) : (
              <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
              }} />
            )
          )
      }
  }

  export default GroupBox;
