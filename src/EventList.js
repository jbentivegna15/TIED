//EventList.js
import React, { Component } from 'react';
import style from './style';
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
							<div style={ style.commentList }>
							{ eventNodes }
							</div>
						)
	}
}

export default EventList;
