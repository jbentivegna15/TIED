//EventList.js
import React, { Component } from 'react';
import Event from "./Event";

class EventList extends Component {
	render() {
			let eventNodes = this.props.data.map(events => {
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
									onEventDelete={ this.props.onEventDelete }
									onEventEdit={ this.props.onEventEdit }
									key={ events['_id']}
									admin={ this.props.admin }>
									</Event>
								 )
			})
			return (
//page formatting
							<div className="scrollList">
							{ eventNodes }
							</div>
						)
	}
}

export default EventList;
