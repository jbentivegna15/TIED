//UserBox.js
import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import { isLoggedIn } from './Auth/AuthService';
import UserPageList from './UserPageList';
import UserForm from './forms/UserForm';
import { APICONST } from './urlConst';

class UserPageBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], udata: [], id: props.match.params.user_id }
        this.loadEventsFromServer = this.loadEventsFromServer.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
      }
      loadEventsFromServer() {
        axios.get(`${this.props.url}/${this.state.id}`)
        .then(res => {
            this.setState({ udata: res.data });
            this.setState({ data: res.data.rsvps });
        })
        .catch(err => {
            console.error(err);
        });
      }
      handleUserSubmit(user) {
        axios.put(`${this.props.url}/${this.state.id}`, user)
          .then(res => {
            console.log('updated');
          })
          .catch(err => {
            console.log(err);
          });
      }
      componentDidMount() {
        this.loadEventsFromServer();
      }
      render() {
          return (
            isLoggedIn() ? (
            <div>
              <UserForm onUserSubmit={ this.handleUserSubmit }
                data={ this.state.udata.firstname }/>
              <UserPageList
              userId={ this.state.id }
              data={ this.state.data }/>
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

  export default withRouter(UserPageBox);
