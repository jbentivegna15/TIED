import React, {Component} from 'react';
import style from '../style';
import '../components/styles.css';

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = { firstname: this.props.data, lastname: "", email: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  handleFirstnameChange(e) {
      this.setState({ firstname: e.target.value });
  }
  handleLastnameChange(e) {
      this.setState({ lastname: e.target.value });
  }
  handleEmailChange(e) {
      this.setState({ email: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let firstname = this.state.firstname.trim();
    let lastname = this.state.lastname.trim();
    let email = this.state.email.trim()
    if (!firstname || !lastname || !email) {
      return;
    }
    this.props.onUserSubmit({ firstname: firstname, lastname: lastname, email: email });
  }
  render() {
    return (
      <div className="divFont divCenter">
        <div id="right">
          <h2><form onSubmit={ this.handleSubmit }>
            Enter Firstname:<br/>
            <input type="text" placeholder="John" value={ this.state.firstname } onChange={ this.handleFirstnameChange } required="required"/><br/>
            Enter Lastname:<br/>
            <input type="text" placeholder="Doe" value={ this.state.lastname } onChange={ this.handleLastnameChange } required="required"/><br/>
            Enter Email:<br/>
            <input type="text" placeholder="johndoe@gmail.com" value={ this.state.email } onChange={ this.handleEmailChange } required="required"/><br/>
            <input type="submit" value='Submit'/>
          </form></h2>
        </div>
      </div>
    )
  }
}

export default UserForm;
