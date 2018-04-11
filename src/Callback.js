import { Component } from 'react';
import { setAccessToken, setIdToken, checkUserInDB, getUserIdentifier } from './Auth/AuthService';
import axios from 'axios';
//import setIdToken from './Auth/setIdToken'
//import setAccessToken  from './Auth/setAccessToken';

class Callback extends Component {

  constructor() {
    super()
    this.state = { uniqueID: ''};
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    if(!checkUserInDB()){
      var userIdentifier = getUserIdentifier();
      var user = {user:'',
                  uniqueID: userIdentifier,
                  password: '',
                  firstname: '',
                  lastname: '',
                  email: '',
                  admin_groups: [],
                  private_groups: [],
                  rsvps: [],
                  messages: []
                };
      axios.post(this.props.url, user)
          .catch(err => {
              console.error(err);
          });
    }
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Callback;
