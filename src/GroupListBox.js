//GroupListBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupList from './GroupList';
import style from './style';
import { Redirect } from 'react-router-dom';
import { isLoggedIn, getAccessToken } from './Auth/AuthService';

class GroupListBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [] }
					this.loadGroupsFromServer = this.loadGroupsFromServer.bind(this);
      }
			loadGroupsFromServer() {
					console.log(getAccessToken());
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
	            <div>
	            <h1 style={style.title}>TIED</h1>
	            <h2 style={style.title}>Groups:</h2>
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
