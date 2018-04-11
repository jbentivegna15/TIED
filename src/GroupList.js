//GroupList.js
import React, { Component } from 'react';
import style from './style';
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
                <div style={ style.commentList }>
                { groupNodes }
                </div>
              )
    }
}

export default GroupList;
