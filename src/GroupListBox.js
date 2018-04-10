//GroupListBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupList from './GroupList';
import style from './style';

class GroupListBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [] }
					this.loadGroupsFromServer = this.loadGroupsFromServer.bind(this);
      }
			loadGroupsFromServer() {
					axios.get(this.props.url)
							.then(res => {
									this.setState({ data: res.data });
							})
							.catch(err => {
									console.error(err);
							});
			}
			componentDidMount() {
					this.loadGroupsFromServer();
					setInterval(this.loadGroupsFromServer, this.props.pollInterval);
			}
      render() {
          return (
            <div>
            <h1 style={style.title}>TIED</h1>
            <h2 style={style.title}>Groups:</h2>
						<GroupList data={ this.state.data }/>
            </div>
          )
      }
  }

  export default GroupListBox;
