import GroupListBox from './GroupListBox'
import GroupPageBox from './GroupPageBox'
import EventBox from './EventBox'
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const GroupListNav = () => (
  <Router>
    <Switch>
      <Route exact path={"/groupList"} component={() => <GroupListBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
			<Route path={"/groupList/:group_id"} component={() => <GroupPageBox url={'http://localhost:3001/api/groups/'} pollInterval={2000}/>}/>
			<Route path={"/groupList/:group_id/createEvent"} component={() => <EventBox url={'http://localhost:3001/api/groups'} pollInterval={2000}/>}/>
		</Switch>
  </Router>
);

export default GroupListNav;
