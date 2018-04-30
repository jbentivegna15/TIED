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
                <Link to={{pathname: `/groupList/${this.props.uniqueID}`, userId: this.props.userId}}>
                  <div className="name">
                    {this.props.name}
                  </div>
                </Link>
                <div className="desc">
                  {this.props.description}
                </div>
              </div>
             )
  }
}

export default Group;
