//Event.js
import React, { Component } from 'react';
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
//page formatting
              <div className="divFont listStyle">
                <h3>{this.props.name}</h3>
                {this.props.description}
              </div>
             )
  }
}

export default Event;
