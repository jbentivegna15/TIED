//EventList.js
import React, { Component } from 'react';
import Event from "./Event";

class EventList extends Component {
	render() {
			let eventNodes = this.props.data.map(events => {
					return (
									<Event
									name={ events.name }
									uniqueID={ events['_id'] }
									description={ events.description }>
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
