import React, { Component } from "react";
import history from '../../history'

export default class Contact extends Component {
  componentDidMount() {
    history.push('/');
  }
  render() {
    return (
      <div id="contact">
        This is the contact me page.
      </div>
    );
  }
}
