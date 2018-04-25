//GroupPageBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupPage from './GroupPage';
import EventList from './EventList';
import { Link, withRouter, Redirect } from "react-router-dom";
import {isAdmin} from './Auth/UserChecks'

class GroupPageBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], edata: [], id: props.match.params.group_id, deleted: false, adminStatus: false}
					this.handleClickGroup= this.handleClickGroup.bind(this);
					this.handleGroupDelete = this.handleGroupDelete.bind(this);
					this.handleEventDelete = this.handleEventDelete.bind(this);
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
			handleEventDelete(id) {
				axios.delete(`${this.props.url}/${this.state.id}/${id}`)
					.then(res => {
						console.log('Event deleted');
					})
					.catch(err => {
						console.error(err);
					});
			}
			componentDidMount() {
					this.handleClickGroup();
					isAdmin(this.state.id,function(adminStat){
						this.setState({ adminStatus: adminStat});
						console.log(this.state.adminStatus);
					}.bind(this));
					setInterval(this.handleClickGroup, this.props.pollInterval);
			}
      render() {
          return (
//page formatting
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
							<EventList
							onEventDelete={ this.handleEventDelete }
							data={ this.state.edata }
							admin={ this.state.adminStatus }/>
							{this.state.adminStatus &&
										(<button onClick={ this.handleGroupDelete } className="pageButton">Click here to delete group</button>)
							}
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
