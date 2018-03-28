import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      name: '',
      description: '',
      image: '',
    };
    this.deleteGroup = this.deleteGroup.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleGroupUpdate = this.handleGroupUpdate.bind(this);
  }
  updateGroup(e) {
    e.preventDefault();

    this.setState({ toBeUpdated: !this.state.toBeUpdated});
  }
  handleGroupUpdate(e){
    e.preventDefault();
    let id = this.props.uniqueID;
    let name = (this.state.name) ? this.state.name : null;
    let description = (this.state.description) ? this.state.description : null;
    let image = (this.state.image) ? this.state.image : null;
    let group = {name: name, description: description, image: image};
    this.props.onGroupUpdate(id, group);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated
      name: '',
      description: '',
      image: '',
    })
  }
  deleteGroup(e) {
    e.preventDefault()
    let id = this.props.uniqueID;
    this.props.onUserDelete(id);
    console.log('group deleted');
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value })
  }
}

export default Group;
