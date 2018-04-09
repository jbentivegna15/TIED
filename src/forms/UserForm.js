import React, {Component} from 'react';
import style from '../style';
import '../components/styles.css';

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = { user: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfpasswordChange = this.handleConfpasswordChange.bind(this);
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
  handleUserChange(e) {
      this.setState({ user: e.target.value });
  }
  handlePasswordChange(e) {
      this.setState({ password: e.target.value });
  }
  handleConfpasswordChange(e) {
      this.setState({ confpassword: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let firstname = this.state.firstname.trim();
    let lastname = this.state.lastname.trim();
    let email = this.state.email.trim()
    let user = this.state.user.trim();
    let password = this.state.password.trim();
    let confpassword = this.state.confpassword.trim()
    if (!firstname || !lastname || !email || !user || !password || !confpassword) {
      return;
    }
    if (password !== confpassword) {
      return;
    }
    this.props.onUserSubmit({ firstname: firstname, lastname: lastname, email: email, user: user, password: password});
    this.setState({ firstname:'', lastname:'', email:'', user:'', password: '', confpassword:''});
  }
  render() {
    return (
      <div>
      <form style={ style.userForm} onSubmit={ this.handleSubmit }>
      Enter First Name:<br/>
      <input
      type='text'
      placeholder='John'
      style={ style.userFormUsername}
      value={ this.state.firstname}
      onChange={ this.handleFirstnameChange } /><br/>
      Enter Last Name:<br/>
      <input
      type='text'
      placeholder='Doe'
      style={ style.userFormUsername}
      value={ this.state.lastname}
      onChange={ this.handleLastnameChange } /><br/>
      Enter Email:<br/>
      <input
      type='text'
      placeholder='JohnDoe@gmail.com'
      style={ style.userFormUsername}
      value={ this.state.email}
      onChange={ this.handleEmailChange } /><br/>
      Enter Username:<br/>
      <input
      type='text'
      placeholder='johndoe1'
      style={ style.userFormUsername}
      value={ this.state.user}
      onChange={ this.handleUserChange } /><br/>
      Enter Password:<br/>
      <input
      type='password'
      placehold='******'
      style={ style.userFormPassword}
      value={ this.state.password}
      onChange={ this.handlePasswordChange } /><br/>
      Confirm Password:<br/>
      <input
      type='password'
      placehold='******'
      style={ style.userFormPassword}
      value={ this.state.confpassword}
      onChange={ this.handleConfpasswordChange } /><br/>
      <input
      type='submit'
      style={ style.userFormPost}
      value='Submit' />
      </form>
      </div>
    )
  }
}

export default UserForm;
