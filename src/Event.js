//Event.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import EventForm from './forms/EventForm';
import MessageForm from './forms/MessageForm';
import UserList from './UserList';
import { rsvp, unrsvp, eventdeleteunrsvp } from './Auth/UserChecks';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state= { name: '', description: '', image: '', isOpen: false, isRSVP: false, userId: ''};
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleUserModal = this.toggleUserModal.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
    this.toggleDetailModal = this.toggleDetailModal.bind(this);
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
  toggleDetailModal(e) {
    e.preventDefault();
    this.setState({ isDetailOpen: !this.state.isDetailOpen})
  }
  deleteEvent(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.attendees.map(user => eventdeleteunrsvp(user,this.props.groupId,this.props.uniqueID));
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
                <div className="name">
                  {this.props.name}
                </div>
                <div className="desc">
                  {this.props.description}<br/>
                  <button className="smallButton" onClick={ this.toggleDetailModal }>Details</button>
                </div>

                {!this.state.isRSVP ?
                  (<div className="desc">
                    <button className="smallButton" onClick={ this.doRSVP }>RSVP</button>
                   </div>
                 ) : (
                   <div className="desc">
                    Registered! <button className="smallButton" onClick={ this.undoRSVP }>Cancel RSVP</button>
                  </div>
                  )
                }

                {this.props.admin &&
                    (<div className="desc">
                      <button className="smallButton" onClick={ this.toggleModal }>Edit</button>
                      <button className="smallButton" onClick={ this.deleteEvent }>Delete</button>
                      <button className="smallButton" onClick={ this.toggleUserModal }>Attendee List</button>
                      <button className="smallButton" onClick={ this.toggleMessageModal }>Message</button>
                    </div>)
                }

                <Modal show={ this.state.isOpen }
                  onClose={ this.toggleModal }>
                  <EventForm onEventSubmit={ this.editEvent }
                    data={{ name: this.props.name, description: this.props.description, date: this.props.date, time: this.props.time, loc: this.props.loc}}/>
                </Modal>

				        <Modal show={ this.state.isUserOpen }
                  onClose={ this.toggleUserModal }>
                  <div className="divFont" style={{padding: "10px"}}>
                    <h2>Attendees of { this.props.name }</h2>
                    <div className="attList">
                      <UserList
                      data={ this.props.attendees }/>
                    </div>
                  </div>
                </Modal>

                <Modal show={ this.state.isMessageOpen }
                  onClose={ this.toggleMessageModal }>
                  <MessageForm onMessageSubmit={ this.sendMessage }
                    data={{ name: this.props.name, attendees: this.props.attendees}}/>
                </Modal>

                <Modal show={ this.state.isDetailOpen }
                  onClose={ this.toggleDetailModal }>
                  <div className="divFont desc">
                    <h2> {this.props.name}'s Details </h2>
                    <img src={this.props.img} className="evPic" align="top">
                    </img>
                    <table>
                      <tr>
                        <th colspan="2">{this.props.name}</th>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{this.props.date}</td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>{this.props.time}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{this.props.loc}</td>
                      </tr>
                    </table>
                    Event Description: <br/>
                    {this.props.description}
                  </div>
                </Modal>

              </div>
             )
  }
}

export default Event;
