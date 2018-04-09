import CommentBox from './CommentBox'
import UserBox from './UserBox'

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/comment">Comment</Link>
        </li>
      </ul>

      <hr />

      <Route exact path={"/"} component={() => <Home/>}/>
      <Route path={"/signup"} component={() => <UserBox url={'http://localhost:3001/api/users'} pollInterval={2000}/>}/>
      <Route path={"/comment"} component={() => <CommentBox url={'http://localhost:3001/api/comments'} pollInterval={2000}/>}/>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default Routes;
