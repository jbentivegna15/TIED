//GroupListBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupList from './GroupList';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from './Auth/AuthService';
import { Link } from 'react-router-dom';

class GroupListBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], userId: '' }
					this.loadGroupsFromServer = this.loadGroupsFromServer.bind(this);
      }
			loadGroupsFromServer() {
					axios.get(this.props.url)
							.then(res => {
									this.setState({ data: res.data });
							})
							.catch(err => {
									console.error(err);
							});
			}
			componentDidMount() {
					this.loadGroupsFromServer();
			}
      render() {
          return (
						isLoggedIn() ? (
//page formatting
	            <div className="divFont">
								<div className="divCenter">
									<h1><Link to='/'>TIED</Link></h1>
								</div>
	            	<h2>PODs:</h2>
								<GroupList data={ this.state.data }/>
	            </div>
						) : (
							<Redirect to={{
								pathname: '/',
								state: { from: this.props.location }
							}} />
						)
          )
      }
}

export default GroupListBox;
