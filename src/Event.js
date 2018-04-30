//Event.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import EventForm from './forms/EventForm';
import MessageForm from './forms/MessageForm';
import UserList from './UserList';
import { rsvp, unrsvp } from './Auth/UserChecks';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state= { name: '', description: '', image: '', isOpen: false, isRSVP: false, userId: ''};
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleUserModal = this.toggleUserModal.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
	  this.sendMessage = this.sendMessage.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.doRSVP = this.doRSVP.bind(this);
    this.undoRSVP = this.undoRSVP.bind(this);
    this.isRSVP = this.isRSVP.bind(this);
  }
  toggleModal(e) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen});
  }
  toggleUserModal(e) {
    e.preventDefault();
    this.setState({ isUserOpen: !this.state.isUserOpen})
  }
  toggleMessageModal(e) {
    e.preventDefault();
    this.setState({ isMessageOpen: !this.state.isMessageOpen})
  }
  sendMessage(message){
    let id=this.props.uniqueID;
    this.props.onMessageSubmit(id, message);
    this.setState({ isMessageOpen: !this.state.isMessageOpen})
  }
  deleteEvent(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onEventDelete(id);
  }
  editEvent(event) {
    let id = this.props.uniqueID;
    this.props.onEventEdit(id, event);
    this.setState({ isOpen: !this.state.isOpen})
  }
  isRSVP(attendees,callback){
    if( attendees.indexOf(this.state.userId) === -1){
      callback(false);
    }
    else{
      callback(true);
    }
  }
  doRSVP(e){
    e.preventDefault();
    rsvp(this.state.userId,this.props.groupId,this.props.uniqueID);
    this.setState({ isRSVP: true});
  }
  undoRSVP(e){
    e.preventDefault();
    unrsvp(this.state.userId,this.props.groupId,this.props.uniqueID);
    this.setState({ isRSVP: false});
  }
  componentDidMount(){
    this.setState({userId: this.props.userId},()=>{
      this.isRSVP(this.props.attendees,function(res){
        if(res){
          this.setState({ isRSVP: true})
        }
        else{
          this.setState({ isRSVP: false})
        }
      }.bind(this));
    });
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
                      <a style={{ color: 'red' }} href='foo' onClick={ this.deleteEvent }>   delete</a>
                      <a style={{ color: 'purple'}} href='foo' onClick={ this.toggleUserModal }> list of attendees </a>
                      <a style={{ color: 'green'}} href='foo' onClick={ this.toggleMessageModal }> Send a Message </a></h4>
                    </div>)
                }
                {!this.state.isRSVP ?
                  (<div>
                    <h4><a style={{ color: 'green'}} href='foo' onClick={ this.doRSVP }>Rsvp 'going' to this event</a></h4>
                   </div>
                 ) : (
                   <div>
                    <h4>You are going to this event!<a style={{color:'red'}} href='foo' onClick={this.undoRSVP }>Cancel RSVP</a></h4>
                  </div>
                  )
                }
                <Modal show={ this.state.isOpen }
                  onClose={ this.toggleModal }>
                  <EventForm onEventSubmit={ this.editEvent }
                    data={{ name: this.props.name, description: this.props.description, date: this.props.date, time: this.props.time, loc: this.props.loc}}/>
                </Modal>

				        <Modal show={ this.state.isUserOpen }
                  onClose={ this.toggleUserModal }>
                  <UserList
                    data={ this.props.attendees }/>
                </Modal>

                <Modal show={ this.state.isMessageOpen }
                  onClose={ this.toggleMessageModal }>
                  <MessageForm onMessageSubmit={ this.sendMessage }
                    data={{ name: this.props.name, attendees: this.props.attendees}}/>
                </Modal>

              </div>
             )
  }
}

export default Event;
