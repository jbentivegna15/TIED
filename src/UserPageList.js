//UserPageList.js
import React, { Component } from 'react';
import Event2 from './Event2'

class UserPageList extends Component {
    constructor(props) {
      super(props);
      this.renderEvents = this.renderEvents.bind(this);
    }
    renderEvents() {
        return this.props.data.map(group => {
            return group.events.map(event => {
              return (
                      <Event2
                      userId={ this.props.userId }
                      eventId={ event }
                      groupId={ group.group_id }>
                      </Event2>
                     )
            })
        })
    }
    render() {
        return (
//page formatting
            this.renderEvents()
        )
    }
}

export default UserPageList;
