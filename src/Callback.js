import { Component } from 'react';
import { setAccessToken, setIdToken, checkUserInDB, getUserIdentifier, getAccessToken } from './Auth/AuthService';
import axios from 'axios';
//import setIdToken from './Auth/setIdToken'
//import setAccessToken  from './Auth/setAccessToken';

class Callback extends Component {

  constructor() {
    super()
    this.state = { data: {}, is: true };
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    console.log(getAccessToken());
    var token = getAccessToken();
        axios.get('https://tied.auth0.com/userinfo/', { headers: { Authorization: `Bearer ${token}`,'Content-type': 'application/json'}})
          .then((res) => {
            console.log(res.data);
            this.setState({data: res.data});
          })
          .then(() => {
            var subId = String(this.state.data.sub);
            axios.get(`http://localhost:3001/api/users/${subId}`)
              .then((res) => {
                console.log(res);
                if(res.data == null){
                  console.log('yup');
                  var user = {user:this.state.data.nickname,
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
                      .then(() => {
                        window.location.href = "/";
                      })
                      .catch(err => {
                          console.error(err);
                      });
                }
                else {
                  window.location.href = "/";
                }
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
              console.error(err);
          });
  }

  render() {
    return null;
  }
}

export default Callback;
