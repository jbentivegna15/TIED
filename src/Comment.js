import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
    constructor(props) {
      super(props);
      this.state= {
        toBeUpdated: false,
        author: '',
        test: ''
      };
      this.deleteComment = this.deleteComment.bind(this);
      this.updateComment = this.updateComment.bind(this);
      this.handleAuthorChange = this.handleAuthorChange.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }
    updateComment(e) {
      e.preventDefault();

      this.setState({ toBeUpdated: !this.state.toBeUpdated});
    }
    handleCommentUpdate(e) {
      e.preventDefault();
      let id = this.props.uniqueID;
      let author = (this.state.author) ? this.state.author : null;
      let text = (this.state.text) ? this.state.text : null;
      let comment = {author: author, text: text};
      this.props.onCommentUpdate(id, comment);
      this.setState({
        toBeUpdated: !this.state.toBeUpdated,
        author: '',
        text: ''
      })
    }
    deleteComment(e) {
      e.preventDefault();
      let id = this.props.uniqueID;
      this.props.onCommentDelete(id);
      console.log('oops deleted');
    }
    handleTextChange(e) {
      this.setState({ text: e.target.value });
    }
    handleAuthorChange(e) {
      this.setState({ author: e.target.value });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
                <div style={ style.comment }>
                <h3>{this.props.author}</h3>
                <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                <a style={ style.updateLink } href='foo' onClick={ this.updateComment }>update</a>
                 <a style={ style.deleteLink } href='foo' onClick={ this.deleteComment }>delete</a>
                 { (this.state.toBeUpdated)
                 ? (<form onSubmit={ this.handleCommentUpdate }>

                 <input
                 type='text'
                 placeholder='Update name...'
                 style={ style.commentFormAuthor }
                 value={ this.state.author }
                 onChange= { this.handleAuthorChange } />

                 <input
                 type='text'
                 placeholder='Update your comment...'
                 style= { style.commentFormText }
                 value={ this.state.text }
                 onChange={ this.handleTextChange } />
                 <input
                 type='submit'
                 style={ style.commentFormPost }
                 value='Update' />
                 </form>)
                 : null}
                </div>
               )
    }
}

export default Comment;
