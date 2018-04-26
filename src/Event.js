//Event.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import EventForm from './forms/EventForm';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state= { name: '', description: '', image: '', isOpen: false};
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
  }
  toggleModal(e) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen});
  }
  deleteEvent(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onEventDelete(id);
    console.log('event deleted');
  }
  editEvent(event) {
    let id = this.props.uniqueID;
    this.props.onEventEdit(id, event);
    console.log('event edited');
    this.setState({ isOpen: !this.state.isOpen})
  }
  render() {
      return (
//page formatting
              <div className="divFont listStyle">
                <h3>{this.props.name}</h3>
                {this.props.description}
                {this.props.admin &&
                    (<div>
                      <h4><a style={{ color: 'blue' }} href='foo' onClick={ this.toggleModal }>edit   </a>
                      <a style={{ color: 'red' }} href='foo' onClick={ this.deleteEvent }>   delete</a></h4>
                    </div>)
                }
                <Modal show={ this.state.isOpen }
                  onClose={ this.toggleModal }>
                  <EventForm onEventSubmit={ this.editEvent }
                    data={{ name: this.props.name, description: this.props.description, date: this.props.date, time: this.props.time, loc: this.props.loc}}/>
                </Modal>
              </div>
             )
  }
}

export default Event;
