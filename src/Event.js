//Event.js
import React, { Component } from 'react';
import style from './style';
import { Link } from 'react-router-dom';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state= {
      name: '',
      description: '',
      uniqueID: '',
      image: ''
    };
  }
  render() {
      return (
              <div style={ style.comment }>
              <h3>{this.props.name}</h3>
              <h3>{this.props.description}</h3>
              </div>
             )
  }
}

export default Event;
