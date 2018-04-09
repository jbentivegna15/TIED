import CommentBox from './CommentBox'
import UserBox from './UserBox'
import Home from './Home'

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <Route exact path={"/"} component={() => <Home/>}/>
      <Route path={"/signup"} component={() => <UserBox url={'http://localhost:3001/api/users'} pollInterval={2000}/>}/>
      <Route path={"/comment"} component={() => <CommentBox url={'http://localhost:3001/api/comments'} pollInterval={2000}/>}/>
    </div>
  </Router>
);

export default Routes;
