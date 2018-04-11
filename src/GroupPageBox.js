//GroupPageBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupPage from './GroupPage';
import EventList from './EventList';
import { Link, withRouter } from "react-router-dom";

class GroupPageBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], edata: [], id: props.match.params.group_id }
					this.handleClickGroup= this.handleClickGroup.bind(this);
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
			componentDidMount() {
					this.handleClickGroup();
			}
      render() {
          return (
//page formatting
						<div className="divFont">
							<div className="divCenter">
            		<h1><Link to="/">TIED</Link></h1>
							</div>
							<Link to={`/groupList/${this.state.id}/createEvent`}><button className="pageButton">Click here to create an event!</button></Link>
							<h2>Group Information:</h2>
							<GroupPage data={ this.state.data }/>
							<h2>Event List:</h2>
							<EventList data={ this.state.edata }/>
						</div>
        )}
  }

  export default withRouter(GroupPageBox);
