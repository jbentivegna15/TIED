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
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  deleteEvent(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onEventDelete(id);
    console.log('event deleted');
  }
  render() {
      return (
//page formatting
              <div className="divFont listStyle">
                <h3>{this.props.name}</h3>
                {this.props.description}
                <h4><a style={{ color: 'red' }} href='foo' onClick={ this.deleteEvent }>delete</a></h4>
              </div>
             )
  }
}

export default Event;
