import React, {Component} from 'react';
import style from '../style';

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let password = this.state.password.trim();
    if (!text || !author) {
      return;
    }
    this.props.onUserSubmit({ name: name, password: password});
    this.setState({name:'', password: ''});
  }
  render() {
    return;
  }
}

export default UserForm;
