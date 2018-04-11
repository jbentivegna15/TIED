//GroupPageRender.js
import React, { Component } from 'react';
import axios from 'axios';
//import EventList from './EventList';
import GroupPage from './GroupPage'
import style from './style';

class GroupPageRender extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [] }
					this.loadGroupFromServer = this.loadGroupFromServer.bind(this);
      }
			loadGroupFromServer() {
					axios.get(props.match.params._id)
							.then(res => {
									this.setState({ data: res.data });
							})
							.catch(err => {
									console.error(err);
							});
			}
			componentDidMount() {
					this.loadGroupFromServer();
					setInterval(this.loadEventsFromServer, this.props.pollInterval);
			}
      render() {
          return (
            <div>
						<GroupList data={ this.state.data }/>
            </div>
          )
      }
  }
						//<EventList data={ this.state.data }/>
  export default GroupPage;
