//Group.js
import React, { Component } from 'react';
import style from './style';
import { Link, withRouter } from 'react-router-dom';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state= {
      name: '',
      description: '',
      image: ''
    };
  }
  render() {
      return (
              <div style={ style.comment }>
              <li><Link to={`/groupList/${this.props.uniqueID}`} style={{ textDecoration: 'none'}}>{this.props.name}</Link></li>
              <h3>{this.props.description}</h3>
              </div>
             )
  }
}

export default withRouter(Group);
