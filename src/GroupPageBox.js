//GroupPageBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupPage from'./GroupPage';
import style from './style';
import { withRouter } from "react-router-dom";

class GroupPageBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], id: props.match.params.group_id }
					this.handleClickGroup= this.handleClickGroup.bind(this);
      }
			handleClickGroup() {
					axios.get(`${this.props.url}${this.state.id}`)
							.then(res => {
									this.setState({ data: res.data });
							})
							.catch(err => {
									console.error(err);
							});
			}
			componentDidMount() {
					this.handleClickGroup();
					setInterval(this.handleClickGroup, this.props.pollInterval);
			}
      render() {
          return (
						<div>
            <h1 style={style.title}>TIED</h1>
						<h2 style={style.title}>Group Information:</h2>
						<GroupPage
						data={ this.state.data }/>
						</div>
        )}
  }

  export default withRouter(GroupPageBox);
