import Home from './Home'
import GroupBox from './GroupBox'
import EventBox from './EventBox'
import GroupListBox from './GroupListBox'
import GroupPageBox from './GroupPageBox'
import Header from './Header';
//import Login from './Auth/Login';
//import Logout from './Auth/Logout';
import Callback from './Callback';
import { requireAuth } from './Auth/AuthService'

import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Route exact path={"/"} component={() => <Home />}/>
      <Route path={"/createGroup"} component={() => <GroupBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
      <Route exact path={"/groupList"} onEnter={requireAuth} component={() => <GroupListBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
      <Route exact path={"/groupList/:group_id"} onEnter={requireAuth} component={() => <GroupPageBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
			<Route exact path={"/groupList/:group_id/createEvent"} onEnter={requireAuth} component={() => <EventBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
      <Route path={"/callback"} component={() => <Callback url={'http://localhost:3001/api/users'}/>} />
    </div>
  </Router>
);

export default Routes;
