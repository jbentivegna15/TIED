//Event.js
import React, { Component } from 'react';
import axios from 'axios';
import { rsvp, unrsvp } from './Auth/UserChecks';
import { APICONST } from './urlConst';

class Event2 extends Component {
  constructor(props) {
    super(props);
    this.state= { data: [], edata:[], userId: '', isRSVP: true };
    this.getGroupData = this.getGroupData.bind(this);
    this.getEventData = this.getEventData.bind(this);
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
                  {this.props.name}
                  {this.state.edata.name}
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
              </div>
      )
  }
}

export default Event2;
