//EventBox.js
import React, { Component } from 'react';
import axios from 'axios';
import EventForm from './forms/EventForm';
import style from './style';
import { withRouter } from "react-router-dom";

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
            <div>
            <h1 style={style.title}>TIED</h1>
            <h2 style={style.title}>Create Event</h2>
            <EventForm onEventSubmit={ this.handleEventSubmit }/>
            </div>
          )
      }
  }

  export default withRouter(EventBox);
