import UserBox from './UserBox'
import GroupBox from './GroupBox'
import GroupListBox from './GroupListBox'
import Home from './Home'
import Header from './Header';
import Private from './Private';
import Login from './Auth/Login';
import Logout from './Auth/Logout';


import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Route exact path={"/"} component={() => <Home />}/>
      <Route path={"/signup"} component={() => <UserBox url={'http://localhost:3001/api/users'} pollInterval={2000}/>}/>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/private" component={Private} />
      <Route path={"/createGroup"} component={() => <GroupBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
      <Route path={"/groupList"} component={() => <GroupListBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
    </div>
  </Router>
);

export default Routes;
