//UserBox.js
import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import UserPageList from './UserPageList';

class UserPageBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], id: props.match.params.user_id }
        this.loadEventsFromServer = this.loadEventsFromServer.bind(this);
      }
      loadEventsFromServer() {
        axios.get(`${this.props.url}/${this.state.id}`)
        .then(res => {
            this.setState({ data: res.data.rsvps});
        })
        .catch(err => {
            console.error(err);
        });
      }
      componentDidMount() {
        this.loadEventsFromServer();
      }
      render() {
          return (
            <div>
              <UserPageList
              userId={ this.state.id }
              data={ this.state.data }/>
            </div>
          )
      }
  }

  export default withRouter(UserPageBox);
