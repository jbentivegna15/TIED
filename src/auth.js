import auth0 from 'auth0-js';
//import { withRouter } from "react-router-dom";
import history from './history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'tied.auth0.com',
    clientID: 'CtS7hL_GmQPa6DLR-I2ZQIbiPfmu97G1',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://tied.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/");
      } else if (err) {
        history.replace("/");
        console.log(err);
      }
    });
  }

  setSession = (authResult) => {

    let expiresAt= JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    history.replace("/")
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    history.replace("/login")
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
