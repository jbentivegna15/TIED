//Home.js
import React from 'react';
import { Link } from "react-router-dom";
import { isLoggedIn } from './Auth/AuthService';

const Home = () => (
  <div>
    {
      !isLoggedIn() && (
//page formatting
        <div className="divFont divCenter">
          <h1>TIED</h1>
          <p>
            Welcome to Tomorrow's Interactive Event Database, TIED! <br/>
            Use this platform to create your PODs and events
          </p>
        </div>
      )
    }
    {
      isLoggedIn()&&(
//page formatting
        <div className="divFont divCenter">
          <h1><Link to='/'>TIED</Link></h1>
          <Link to="/createGroup"><button className="pageButton">Create a POD</button></Link><br/>
          <Link to="/groupList"><button className="pageButton">PODs List</button></Link>
        </div>
      )
    }
  </div>
)

export default Home;
