//Group.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state= {
      name: '',
      description: '',
      uniqueID: '',
      image: ''
    };
  }
  render() {
      return (
//page formatting
              <div className="divFont listStyle">
                <Link to={{pathname: `/groupList/${this.props.uniqueID}`,
                          userId: this.props.userId}}>
                  <h3>{this.props.name}</h3>
                </Link>
                {this.props.description}
              </div>
             )
  }
}

export default Group;
