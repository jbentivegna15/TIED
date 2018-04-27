//Event.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import EventForm from './forms/EventForm';
import { rsvp, unrsvp } from './Auth/UserChecks';
import { getUserIdentifier } from './Auth/AuthService';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state= { name: '', description: '', image: '', isOpen: false, isRSVP: false, userId: ''};
    this.toggleModal = this.toggleModal.bind(this);
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
    console.log("event:");
    console.log(this.state.userId);
    if( attendees.indexOf(this.state.userId) == -1){
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
  componentWillReceiveProps(nextProps){
		if(this.state.userId != nextProps.userId){
			this.setState({userId: nextProps.userId});
		}
	}
  componentDidMount(){
    console.log(`oi:${this.props.userId}`);
    this.setState({userId: this.props.userId},()=>{
      this.isRSVP(this.props.attendees,function(res){
        console.log(res);
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
                      <a style={{ color: 'red' }} href='foo' onClick={ this.deleteEvent }>   delete</a></h4>
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
              </div>
             )
  }
}

export default Event;
