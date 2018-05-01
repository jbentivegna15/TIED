//GroupPageBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupPage from './GroupPage';
import EventList from './EventList';
import Modal from './Modal';
import GroupForm from './forms/GroupForm';
import AdminList from './AdminList';
import { Link, withRouter, Redirect } from "react-router-dom";
import {isAdmin, isRQAdmin, rqAdmin, approveAdmin, rejectAdmin, eventdeleteunrsvp } from './Auth/UserChecks'
import { getUserIdentifier, isLoggedIn } from './Auth/AuthService';

class GroupPageBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], edata: [], id: props.match.params.group_id, deleted: false, isOpen: false, isAdminOpen: false, adminStatus: false, rqAdminStatus: false, userId:''}
					this.toggleModal = this.toggleModal.bind(this);
					this.toggleAdminModal = this.toggleAdminModal.bind(this);
					this.handleClickGroup= this.handleClickGroup.bind(this);
					this.handleGroupDelete = this.handleGroupDelete.bind(this);
					this.handleMessageSend = this.handleMessageSend.bind(this);
					this.handleEventDelete = this.handleEventDelete.bind(this);
					this.handleGroupEdit = this.handleGroupEdit.bind(this);
					this.handleEventEdit = this.handleEventEdit.bind(this);
					this.handleAdminRequest = this.handleAdminRequest.bind(this);
					this.handleAdminAccept = this.handleAdminAccept.bind(this);
					this.handleAdminDecline = this.handleAdminDecline.bind(this);
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
				this.state.edata.map(event => {
					event.attendees.map(user => {
						eventdeleteunrsvp(user,this.state.id,event);
					});
				});
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
				//axios.post(`${this.props.url}/${this.state.id}/`,message)
				.then(res => {
					this.setState({ submitted: true});
				})
				.catch(err => {
					console.error(err);
				});
			}
			handleAdminRequest() {
				rqAdmin(this.state.userId,this.state.id);
				this.setState({ rqAdminStatus: !this.state.rqAdminStatus})
			}
			toggleAdminModal() {
				this.setState({ isAdminOpen: !this.state.isAdminOpen});
			}
			handleAdminAccept(id) {
				approveAdmin(id,this.state.id);
				console.log('admin accepted');
			}
			handleAdminDecline(id) {
				rejectAdmin(id,this.state.id);
				console.log('admin rejected');
			}
			componentDidMount() {
					this.handleClickGroup();
					getUserIdentifier(function(res){
						this.setState({userId: res},() => {
							isAdmin(this.state.userId,this.state.id,function(adminStat){
								this.setState({ adminStatus: adminStat});
							}.bind(this));
							isRQAdmin(this.state.userId,this.state.id,function(rqAdminStat){
								this.setState({ rqAdminStatus: rqAdminStat});
							}.bind(this));
						});
					}.bind(this))
					setInterval(this.handleClickGroup, this.props.pollInterval);
			}
      render() {
          return (
						isLoggedIn() ? (
							<div className="divFont">
								<div className="divCenter">
	            		<h1><Link to="/">TIED</Link></h1>
								</div>
								{this.state.adminStatus ?
											(<div className="divFont">
												<Link to={`/groupList/${this.state.id}/createEvent`}><button className="pageButton">Create Event</button></Link>
												<button onClick={ this.toggleAdminModal } className="pageButton">Manage Admin Requests</button>
											</div>)
											: [(!this.state.rqAdminStatus ?
														(<div>
																<button onClick={ this.handleAdminRequest } className="pageButton">Request Admin Status</button>
														</div>)
														: null)
												]
								}
								<h2>POD Information:</h2>
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
											 	<button onClick={ this.toggleModal } className="pageButton">Edit group</button>
												<button onClick={ this.handleGroupDelete } className="pageButton">Delete group</button>
										 </div>)
								}
								<Modal show={ this.state.isOpen }
									onClose={ this.toggleModal }>
	                <GroupForm onGroupSubmit={ this.handleGroupEdit }
										data={ this.state.data }/>
								</Modal>
								<Modal show={ this.state.isAdminOpen }
									onClose={ this.toggleAdminModal }>
									<div className="divFont">
										<AdminList
											data={ this.state.data }
											onAdminAccept={ this.handleAdminAccept }
											onAdminDecline={ this.handleAdminDecline }/>
									</div>
								</Modal>
								{this.state.deleted ?
									(<Redirect to={{
										pathname: '/groupList',
										state: { from: this.props.location }
									}} />)
									: null}
							</div>
						) : (
							<Redirect to={{
								pathname: '/',
								state: { from: this.props.location }
							}} />
						)
        )}
  }

  export default withRouter(GroupPageBox);
