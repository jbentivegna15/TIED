import { Component } from 'react';
import { setAccessToken, setIdToken, checkUserInDB, getUserIdentifier, getAccessToken } from './Auth/AuthService';
import axios from 'axios';
//import setIdToken from './Auth/setIdToken'
//import setAccessToken  from './Auth/setAccessToken';

class Callback extends Component {

  constructor() {
    super()
    this.state = { data: {} };
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();

      console.log(getAccessToken());
      var token = String(getAccessToken());
      axios.get('https://tied.auth0.com/userinfo/', { headers: { Authorization: `Bearer ${token}` }})
        .then((res) => {
          console.log(res.data);
            this.setState({ data: res.data });
        })
        .catch(err => {
            console.error(err);
        });
      console.log(this.state.data);
      //var userIdentifier = getUserIdentifier();
      var user = {user:'',
                  uniqueId: this.state.data.sub,
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

    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Callback;
