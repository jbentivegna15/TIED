//GroupPageBox.js
import React, { Component } from 'react';
import axios from 'axios';
import GroupPage from './GroupPage';
import EventList from './EventList';
import style from './style';
import { Link, withRouter } from "react-router-dom";

class GroupPageBox extends Component {
			constructor(props) {
					super(props);
					this.state = { data: [], edata: [], id: props.match.params.group_id }
					this.handleClickGroup= this.handleClickGroup.bind(this);
      }
			handleClickGroup() {
					axios.get(`${this.props.url}/${this.state.id}`)
							.then(res => {
									this.setState({ data: res.data});
									this.setState({ edata: res.data.events});
							})
							.catch(err => {
									console.error(err);
							});
			}
			componentDidMount() {
					this.handleClickGroup();
			}
      render() {
          return (
						<div>
            <h1 style={style.title}>TIED</h1>
						<li><Link to={`/groupList/${this.state.id}/createEvent`} style={{ textDecoration: 'none'}}>Click here to create an event!</Link></li>
						<h2 style={style.title}>Group Information:</h2>
						<GroupPage
						data={ this.state.data }/>
						<h2 style={style.title}>Event List:</h2>
						<EventList
						data={ this.state.edata }/>
						</div>
        )}
  }

  export default withRouter(GroupPageBox);
