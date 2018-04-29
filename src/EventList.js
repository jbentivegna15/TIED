//EventList.js
import React, { Component } from 'react';
import Event from "./Event";

class EventList extends Component {
	constructor(props) {
			super(props);
			this.state = { userId: ''};
			this.renderEvents = this.renderEvents.bind(this);
		}
	renderEvents(){
		return this.props.data.map(events => {
				return (
								<Event
								name={ events.name }
								description={ events.description }
								date={ events.date }
								time={ events.time }
								loc={ events.loc }
								img={ events.img }
								attendees={ events.attendees}
								uniqueID={ events['_id'] }
								groupId={ this.props.groupId }
								userId = { this.state.userId }
								onEventDelete={ this.props.onEventDelete }
								onEventEdit={ this.props.onEventEdit }
								onMessageSubmit={ this.props.onMessageSubmit}
								key={ events['_id']}
								admin={ this.props.admin }>
								</Event>
							)

				 })
	}
	componentDidMount(){
		this.setState({userId: this.props.userId});
	}
	render() {
		const userId = this.state.userId;
		return(
			(userId.length !== 0) ? (
							this.renderEvents()
						) : (
							<span>Loading Events</span>
						)
			)
	}
}

export default EventList;
