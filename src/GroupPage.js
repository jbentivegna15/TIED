//GroupPage.js
import React, { Component } from 'react';
import style from './style';
import Group from './Group';

class GroupPage extends Component {
      render() {
          let aGroup = this.props.data;
          return (
                  <Group
                  name={ aGroup.name }
                  uniqueID={ aGroup['_id'] }
                  description={ aGroup.description }>
                  </Group>
                )
      }
}

export default GroupPage;
