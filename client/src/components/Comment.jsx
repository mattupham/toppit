import React from'react';
import { Button, Comment, Form, Card, Header } from 'semantic-ui-react';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';
import store from '../js/store.js';
import http from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setReplyCommentText } from '../js/actions/commentActions';

class MyComment extends React.Component {
  constructor(props) {
    super(props);
    this.onReply = this.onReply.bind(this);
  }
  handleInputText(e, { value }) {
    this.props.setReplyCommentText(value);
  }
  onReply() {
    let topicId = store.getState().topicList.selectedTopic._id;

    let comment = {
      text: store.getState().comment.commentText,
      timeStamp: new Date(),
      authorId: store.getState().user.user.id,
      authorUsername: store.getState().user.user.username,
      parentId: null || this.props.comment._id,
      comments: []
    };
    console.log(comment);
    http.post(`/api/topic/${topicId}/${this.props.comment._id}`, comment)
      .then((data) => {
        console.log('Data', data);
      })
      .catch((err) => {
        console.error(err);
      });
    // alert(this.props.comment.text);
  }
  render() {
    console.log(this.props.comment);
    let name = (this.props.comment.authorId && (this.props.comment.authorId.fullName || this.props.comment.authorId.username) || '');
    let photoUrl = (this.props.comment.authorId && this.props.comment.authorId.photo) || defaultPhoto;

    return (
      <Comment>
        <Comment.Avatar className='commentuser' src={photoUrl} />
        <Comment.Content>
          <Comment.Author as='a'>{this.props.comment.username}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(this.props.comment.timeStamp).fromNow()}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.comment.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
          <Form reply>
            <Form.TextArea onChange={this.handleInputText.bind(this)} />
            <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Content>
      </Comment>
    );
  }
}
const mapStateToProps = (state) => ({
  commentText: state.comment.commentText,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setReplyCommentText }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComment);