//GroupList.js
import React, { Component } from 'react';
import Group from "./Group";


class GroupList extends Component {
    render() {
        let groupNodes = this.props.data.map(group => {
            return (
                    <Group
                    name={ group.name }
                    uniqueID={ group['_id'] }
                    description={ group.description }>
                    </Group>
                   )
        })
        return (
//page formatting
                <div className="scrollList">
                { groupNodes }
                </div>
              )
    }
}

export default GroupList;
