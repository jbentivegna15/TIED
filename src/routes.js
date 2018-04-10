import UserBox from './UserBox'
import GroupBox from './GroupBox'
import GroupListBox from './GroupListBox'
import Home from './Home'
import Auth from './auth';
import Callback from './Callback';
import history from './history'

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routes = () => (
  <Router history = {history}>
    <div>
      <Route exact path={"/"} component={() => <Home auth={auth}/>}/>
      <Route path={"/signup"} component={() => <UserBox url={'http://localhost:3001/api/users'} auth={auth} pollInterval={2000}/>}/>
      <Route path={"/createGroup"} component={() => <GroupBox url={'http://localhost:3001/api/groups'} auth={auth} pollInterval={2000}/>}/>
      <Route path={"/groupList"} component={() => <GroupListBox url={'http://localhost:3001/api/groups'} auth={auth} pollInterval={2000}/>}/>
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
    </div>
  </Router>
);

export default Routes;
