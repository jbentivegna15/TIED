//EventBox.js
import React, { Component } from 'react';
import axios from 'axios';
import EventForm from './forms/EventForm';
import style from './style';

class EventBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
        this.handleEventSubmit = this.handleEventSubmit.bind(this);
      }
      handleEventSubmit(id, event) {
        axios.put(`${this.props.url}/${id}`, event)
          .catch(err => {
            console.error(err);
          });
  		}
      render() {
          return (
            <div>
            <h1 style={style.title}>TIED</h1>
            <h2 style={style.title}>Create Event</h2>
            <EventForm onEventSubmit={this.handleEventSubmit }/>
            </div>
          )
      }
  }

  export default EventBox;
