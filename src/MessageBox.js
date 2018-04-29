//EventBox.js
import React, { Component } from 'react';
import axios from 'axios';
import MessageForm from './forms/MessageForm';
import { withRouter, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isAdmin } from './Auth/UserChecks'

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], 
			id: props.match.params.group_id, 
			submitted: false,
			adminStatus: true 
		};
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
      }
      handleMessageSubmit(e) {
        axios.put(`${this.props.url}/${this.state.id}`, e)
          .then(res => {
            this.setState({ submitted: true});
          })
          .catch(err => {
            console.error(err);
          });
  		}
      componentDidMount() {
        isAdmin( this.state.id, function(adminStat){
          this.setState({ adminStatus: adminStat });
        }.bind(this));
      }
      render() {
          return (
//page formatting
            this.state.adminStatus ? (
              <div className="divFont divCenter">
                <h1><Link to="/">TIED</Link></h1>
                <h2>Send Message</h2>
                <MessageForm onMessageSubmit={ this.handleMessageSubmit }
                data={ this.state.data }/>
                {this.state.submitted ?
                  (<Redirect to={{
                    pathname: `/groupList/${this.state.id}`,
                    state: { from: this.props.location }
                  }} />)
                  : null}
              </div>
            ) : (
              <Redirect to={{
                pathname: '/groupList',
                state: { from: this.props.location }
              }} />
            )
          )
      }
  }

  export default withRouter(MessageBox);
