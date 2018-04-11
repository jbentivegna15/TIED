//Home.js
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import style from './style';
import { isLoggedIn } from './Auth/AuthService';

const Home = () => (
  <div>
    {
      !isLoggedIn() && (
        <div>
          <h1 style={style.title}>TIED</h1>
        </div>
      )
    }
    {
      isLoggedIn()&&(
        <div>
          <h1 style={style.title}>TIED</h1>
          <div className="divCenter">
            <button className="pageButton"><Link to="/createGroup">Create Group</Link></button><br/>
            <button className="pageButton"><Link to="/groupList">Group List</Link></button>
          </div>
        </div>
      )
    }
  </div>
)

export default Home;
