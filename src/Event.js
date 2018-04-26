//Event.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import EventForm from './forms/EventForm';
import { rsvp } from './Auth/UserChecks';
import { getUserIdentifier } from './Auth/AuthService';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state= { name: '', description: '', image: '', isOpen: false, isRSVP: false};
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.doRSVP = this.doRSVP.bind(this);
    this.isRSVP = this.isRSVP.bind(this);
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
  isRSVP(attendees,callback){
    console.log('1');
    getUserIdentifier(function(userId){
      console.log(userId);
      if( attendees.indexOf(userId) == -1){
        callback(false);
      }
      else{
        callback(true);
      }
    });
  }
  doRSVP(e){
    e.preventDefault();
    rsvp(this.props.groupId,this.props.uniqueID);
  }
  componentDidMount(){
    this.isRSVP(this.props.attendees,function(res){
      console.log(res);
      if(res){
        this.setState({ isRSVP: true})
      }
      else{
        this.setState({ isRSVP: false})
      }
    }.bind(this));
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
                {!this.state.isRSVP ?
                  (<div>
                    <h4><a style={{ color: 'green'}} href='foo' onClick={ this.doRSVP }> going </a></h4>
                   </div>
                 ) : (
                   <div>
                    <h4>You are going to this event!</h4>
                  </div>
                 )
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
