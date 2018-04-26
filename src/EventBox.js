//EventBox.js
import React, { Component } from 'react';
import axios from 'axios';
import EventForm from './forms/EventForm';
import { withRouter, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isAdmin } from './Auth/UserChecks'

class EventBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], id: props.match.params.group_id, submitted: false, adminStatus: true };
        this.handleEventSubmit = this.handleEventSubmit.bind(this);
      }
      handleEventSubmit(event) {
        axios.put(`${this.props.url}/${this.state.id}`, event)
          .then(res => {
            this.setState({ submitted: true});
          })
          .catch(err => {
            console.error(err);
          });
  		}
      componentDidMount() {
        isAdmin( this.state.id, function(adminStat){
          this.setState({ adminStatus: adminStat });
        }.bind(this));
      }
      render() {
          return (
//page formatting
            this.state.adminStatus ? (
              <div className="divFont divCenter">
                <h1><Link to="/">TIED</Link></h1>
                <h2>Create Event</h2>
                <EventForm onEventSubmit={ this.handleEventSubmit }
                data={ this.state.data }/>
                {this.state.submitted ?
                  (<Redirect to={{
                    pathname: `/groupList/${this.state.id}`,
                    state: { from: this.props.location }
                  }} />)
                  : null}
              </div>
            ) : (
              <Redirect to={{
                pathname: '/groupList',
                state: { from: this.props.location }
              }} />
            )
          )
      }
  }

  export default withRouter(EventBox);
