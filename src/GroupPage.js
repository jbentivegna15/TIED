//GroupPage.js
import React, { Component } from 'react';
import style from './style';
import { withRouter } from "react-router-dom";
import Group from './Group';
//import EventList from './EventList';\

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

//<EventList data={ this.state.data }/>
export default withRouter(GroupPage);
