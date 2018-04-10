import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state= {
      name: '',
      description: '',
      image: '',
    };
  }
  rawMarkup() {
     let rawMarkup = marked( this.props.children.toString());
     return { __html: rawMarkup };
  }
  render() {
      return (
              <div style={ style.comment }>
              <h3>{this.props.name}</h3>
              <span dangerouslySetInnerHTML={ this.rawMarkup() } />
              </div>
             )
  }
}

export default Group;
