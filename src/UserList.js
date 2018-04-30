//UserList.js
import React, { Component } from 'react';
import axios from 'axios';
import User from "./User";
import { APICONST } from './urlConst'

class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = { data: [] };
    }
    async componentDidMount() {
      const unique = await [...new Set(this.props.data.map(attendees => attendees))]
      const userNodes = unique.map(async (attendees) => {
          const response= await axios.get(`${APICONST}/users/${attendees}`);
          return response.data.firstname.concat(" ", response.data.lastname, " ");
      });
      const users = await Promise.all(userNodes);
      await this.setState({ data: users });
    }
    render() {
        let length = this.state.data.length;
        return (
          <div>
            {length > 0 ? (
              <div>
              { this.state.data }
              </div>
            ) : (
              <span className="divFont">none :(</span>
            )}
          </div>
        )
    }
}
//              let userData = this.getUserName(attendees, function(user) {
export default UserList;
