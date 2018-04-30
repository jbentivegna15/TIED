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
                <h2>{this.state.data.name}</h2>
                <h3>{this.state.edata.name}</h3>
                {this.state.edata.description}
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
              </div>
      )
  }
}

export default Event2;
