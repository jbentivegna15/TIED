//EventBox.js
import React, { Component } from 'react';
import axios from 'axios';
import EventForm from './forms/EventForm';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

class EventBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], id: props.match.params.group_id };
        this.handleEventSubmit = this.handleEventSubmit.bind(this);
      }
      handleEventSubmit(event) {
        axios.put(`${this.props.url}/${this.state.id}`, event)
          .catch(err => {
            console.error(err);
          });
  		}
      render() {
          return (
//page formatting
            <div className="divFont divCenter">
              <h1><Link to="/">TIED</Link></h1>
              <h2>Create Event</h2>
              <EventForm onEventSubmit={ this.handleEventSubmit }/>
            </div>
          )
      }
  }

  export default withRouter(EventBox);
