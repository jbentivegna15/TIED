//Event.js
import React, { Component } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { rsvp, unrsvp } from './Auth/UserChecks';
import { APICONST } from './urlConst';

class Event2 extends Component {
  constructor(props) {
    super(props);
    this.state= { data: [], edata:[], userId: '', isRSVP: true };
    this.getGroupData = this.getGroupData.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.toggleDetailModal = this.toggleDetailModal.bind(this);
    this.doRSVP = this.doRSVP.bind(this);
    this.undoRSVP = this.undoRSVP.bind(this);
  }
  getGroupData() {
    axios.get(`${APICONST}/groups/${this.props.groupId}`)
      .then(res => {
          this.setState({ data: res.data});
      })
      .catch(err => {
          console.error(err);
      });
  }
  getEventData() {
    axios.get(`${APICONST}/groups/${this.props.groupId}/${this.props.eventId}`)
    .then(res => {
        this.setState({ edata: res.data});
    })
    .catch(err => {
        console.error(err);
    });
  }
  toggleDetailModal(e) {
    e.preventDefault();
    this.setState({ isDetailOpen: !this.state.isDetailOpen})
  }
  doRSVP(e){
    e.preventDefault();
    rsvp(this.state.userId,this.props.groupId,this.props.eventId);
    this.setState({ isRSVP: true});
  }
  undoRSVP(e){
    e.preventDefault();
    unrsvp(this.state.userId,this.props.groupId,this.props.eventId);
    this.setState({ isRSVP: false});
  }
  componentDidMount(){
    this.getGroupData()
    this.getEventData()
    this.setState({ userId: this.props.userId });
  }
  render() {
      return (
//page formatting
              <div className="divFont listStyle">
                <div className="name">
                  {this.state.data.name} <br/>
                  {this.state.edata.name}
                </div>
                <div className="desc">
                  {this.state.edata.description}<br/>
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

                <Modal show={ this.state.isDetailOpen }
                  onClose={ this.toggleDetailModal }>
                  <div className="divFont desc">
                    <h2> {this.state.edata.name}'s Details </h2>
                    <img src={this.state.edata.img} className="evPic" align="top">
                    </img>
                    <table>
                      <tr>
                        <th colspan="2">{this.state.edata.name}</th>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{this.state.edata.date}</td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>{this.state.edata.time}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{this.state.edata.loc}</td>
                      </tr>
                    </table>
                    Event Description: <br/>
                    {this.state.edata.description}
                  </div>
                </Modal>
              </div>
      )
  }
}

export default Event2;
