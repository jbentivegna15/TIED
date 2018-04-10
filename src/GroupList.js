//GroupList.js
import React, { Component } from 'react';
import Group from './Group';
import style from './style';
import { Redirect } from 'react-router-dom';
import isAuthenticated from './Auth/isAuthenticated';

class GroupList extends Component {
    constructor(props)  {
      super(props);
    }
    render() {
        let groupNodes = this.props.data.map(group => {
            return (
                    <Group
                    name={ group.name }
                    uniqueID={ group['_id'] }
                    key={ group['_id']}>
                    { group.description}
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
