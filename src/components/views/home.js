import React, { Component } from "react";
import history from '../../history'

export default class Home extends Component {
  componentDidMount() {
    history.push('/');
  }
  render() {
    return (
      <div id="home">
        This is the home page.
      </div>
    );
  }
}
