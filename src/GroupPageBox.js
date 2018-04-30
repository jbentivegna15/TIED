//GroupPageBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupPage from './GroupPage';
import EventList from './EventList';
import Modal from './Modal';
import GroupForm from './forms/GroupForm';
import { Link, withRouter, Redirect } from "react-router-dom";
import {isAdmin } from './Auth/UserChecks'
import { getUserIdentifier } from './Auth/AuthService';

class GroupPageBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], edata: [], id: props.match.params.group_id, deleted: false, isOpen: false, adminStatus: false, userId:''}
					this.toggleModal = this.toggleModal.bind(this);
					this.handleClickGroup= this.handleClickGroup.bind(this);
					this.handleGroupDelete = this.handleGroupDelete.bind(this);
					this.handleMessageSend = this.handleMessageSend.bind(this);
					this.handleEventDelete = this.handleEventDelete.bind(this);
					this.handleGroupEdit = this.handleGroupEdit.bind(this);
					this.handleEventEdit = this.handleEventEdit.bind(this);
      }
			toggleModal = () => {
				this.setState({ isOpen: !this.state.isOpen});
			}
			handleClickGroup() {
				axios.get(`${this.props.url}/${this.state.id}`)
					.then(res => {
							this.setState({ data: res.data});
							this.setState({ edata: res.data.events});
					})
					.catch(err => {
							console.error(err);
					});
			}
			handleGroupDelete() {
				axios.delete(`${this.props.url}/${this.state.id}`)
					.then(res => {
						this.setState({ deleted: true });
						console.log('Group deleted');
					})
					.catch(err => {
						console.error(err);
					});
			}
			handleGroupEdit(group) {
				axios.put(`${this.props.url}/${this.state.id}/edit`, group)
					.then(res => {
						this.setState({ isOpen: !this.state.isOpen})
						console.log('Group Edited');
					})
					.catch(err => {
						console.log(err);
					});
			}
			handleEventDelete(id) {
				axios.delete(`${this.props.url}/${this.state.id}/${id}`)
					.then(res => {
						console.log('Event Deleted');
					})
					.catch(err => {
						console.error(err);
					});
			}
			handleEventEdit(id, event) {
				axios.put(`${this.props.url}/${this.state.id}/${id}`, event)
					.then(res => {
						//this.setState({ isOpen: !this.state.isOpen})
						console.log('Event Updated');
					})
					.catch(err => {
						console.log(err);
					});
			}
			handleMessageSend(id, message) {
				axios.post(`${this.props.url}/${this.state.id}/Message`,message)
				.then(res => {
					this.setState({ submitted: true});
				})
				.catch(err => {
					console.error(err);
				});
			}
			componentDidMount() {
					this.handleClickGroup();
					getUserIdentifier(function(res){
						this.setState({userId: res},() => {
							isAdmin(this.state.userId,this.state.id,function(adminStat){
								this.setState({ adminStatus: adminStat});
								console.log(this.state.adminStatus);
							}.bind(this));
						});
					}.bind(this))

					setInterval(this.handleClickGroup, this.props.pollInterval);
			}
      render() {
          return (
						<div className="divFont">
							<div className="divCenter">
            		<h1><Link to="/">TIED</Link></h1>
							</div>
							{this.state.adminStatus &&
										(<div className="divFont">
											<Link to={`/groupList/${this.state.id}/createEvent`}><button className="pageButton">Click here to create an event!</button></Link>
										</div>)
							}
							<h2>Group Information:</h2>
							<GroupPage data={ this.state.data }/>
							<h2>Event List:</h2>
							{this.state.userId.length ? (
								<EventList
								data={ this.state.edata }
								groupId={ this.state.id }
								userId={ this.state.userId }
								onEventDelete={ this.handleEventDelete }
								onEventEdit={ this.handleEventEdit }
								onMessageSubmit={ this.handleMessageSend}
								admin={ this.state.adminStatus }/>
								) : (<span>Loading Events</span>)
							}

							{this.state.adminStatus &&
									 (<div>
										 	<button onClick={ this.toggleModal } className="pageButton">Click here to edit group</button>
											<button onClick={ this.handleGroupDelete } className="pageButton">Click here to delete group</button>
									 </div>)
							}
							<Modal show={ this.state.isOpen }
								onClose={ this.toggleModal }>
                <GroupForm onGroupSubmit={ this.handleGroupEdit }
									data={ this.state.data }/>
							</Modal>
							{this.state.deleted ?
								(<Redirect to={{
									pathname: '/groupList',
									state: { from: this.props.location }
								}} />)
								: null}
						</div>
        )}
  }

  export default withRouter(GroupPageBox);
