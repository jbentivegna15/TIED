import UserBox from './UserBox'
import GroupBox from './GroupBox'
import GroupListBox from './GroupListBox'
import Home from './Home'
import Header from './Header';
//import Login from './Auth/Login';
//import Logout from './Auth/Logout';
import Callback from './Callback';
import { requireAuth} from './Auth/AuthService'

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Route exact path={"/"} component={() => <Home />}/>
      <Route path={"/signup"} component={() => <UserBox url={'http://localhost:3001/api/users'} pollInterval={2000}/>}/>
      <Route path={"/createGroup"} component={() => <GroupBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
      <Route path={"/groupList"} onEnter={requireAuth} component={() => <GroupListBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
      <Route path={"/callback"} component={Callback} />
    </div>
  </Router>
);

export default Routes;
