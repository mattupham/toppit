import React from'react';
import { Button, Comment, Form, Card, Header } from 'semantic-ui-react';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';
import store from '../js/store.js';
import http from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy } from '../js/actions/commentActions';

class MyComment extends React.Component {
  constructor(props) {
    super(props);
    this.onReply = this.onReply.bind(this);
  }
  componentDidMount() {
    this.getAllComments();
  }
  getAllComments() {
    let topicId = store.getState().topicList.selectedTopic._id;
    let author = this.props.comment.authorId.username;
    let text = this.props.comment.text;
    console.log(text);
    let nestedComments = [];
    http.get(`/api/comments/${topicId}/${author}`, { params: { text: this.props.comment.text }})
      .then((comment) => {
        // console.log('Got the comment!', comment);
        this.props.setCommentId(comment.data._id);

        comment.data.comments && comment.data.comments.forEach((comment) => {
          console.log(comment);
          http.get(`/api/comments/${comment}`)
            .then((nested) => {
              // console.log('This is the nested comment', nested);
              // this.props.setNestedComments(nested.data);
              nestedComments.push(nested.data);
              this.props.setNestedCommentsCopy(nestedComments);
            })
            .catch((err) => {
              console.error(err);
            });
        });
        // this.props.setNestedComments(comment.data.comments);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleInputText(e, { value }) {
    this.props.setReplyCommentText(value);
  }
  toggleShowParentReply() {
    let comment = store.getState().comment;
    this.props.setShowReply(!comment.showReply);
  }
  toggleShowNestedReply() {
    let comment = store.getState().comment;
    this.props.setShowReply(!comment.showReply);
  }
  onReply() {
    let topicId = store.getState().topicList.selectedTopic._id;
    console.log(store.getState().comment);
    let comment = {
      text: store.getState().comment.commentText,
      timeStamp: new Date(),
      authorId: store.getState().user.user.id,
      authorUsername: store.getState().user.user.username,
      parentId: this.props.comment._id,
      comments: []
    };
    console.log('Comment in component',comment);
    http.post(`/api/topic/${topicId}/${this.props.comment._id}`, comment)
      .then((data) => {
        console.log('Data', data);
        this.getAllComments();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    console.log(this.props.comment);
    let comment = this.props.comment;
    // let name = (this.props.comment.authorId && (this.props.comment.authorId.fullName || this.props.comment.authorId.username) || '');
    // let photoUrl = (this.props.comment.authorId && this.props.comment.authorId.photo) || defaultPhoto;
    // {
    //   comment.comments.length >= 0 && comment.comments.map((child) => {
    //     return (
    //       <MyComment key={child.id} comment={child} />
    //     )
    //   })
    // }
    // console.log(comment.comments);
    let nested = store.getState().comment.comment.nestedCommentsCopy;
    let parent = store.getState().comment;
    console.log(nested);
    return (
      <div>
        <div>
          {/* {
            comment.comments.length > 0 && comment.comments.map((child) => {
              return <MyComment key={child.id} child={child} />;
            })
          } */}
        </div>
        <Comment>
          <Comment.Avatar className='commentuser' src={defaultPhoto} />
          <Comment.Content>
            <Comment.Author as='a'>{comment.username}</Comment.Author>
            <Comment.Metadata>
              <div>{moment(comment.timeStamp).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={this.toggleShowParentReply.bind(this)}>Reply</Comment.Action>
            </Comment.Actions>
            {
              (store.getState().comment.comment.showReply) &&
                <Form reply className="replyTextArea">
                  <Form.TextArea onChange={this.handleInputText.bind(this)} />
                  <Button onClick={() => this.onReply(store.getState().comment.comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            }
            
            {
              comment.comments && comment.comments.length > 0 && comment.comments.map((child, index) => {
                console.log(child, index);
                return (
                  <Comment.Group key={index}>
                    <Comment>
                      <Comment.Avatar src={defaultPhoto} />
                      <Comment.Content>
                        <Comment.Author as='a'>{store.getState().comment.comment.nestedCommentsCopy.length}</Comment.Author>
                        <Comment.Metadata>
                          <div>{store.getState().comment.comment.nestedComments.timeStamp}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {store.getState().comment.comment.nestedComments.text} :)
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action onClick={this.toggleShowNestedReply.bind(this)}>Reply</Comment.Action>
                        </Comment.Actions>
                        {
                          (parent.showReply) &&
                            <Form reply className="replyTextArea">
                              <Form.TextArea onChange={this.handleInputText.bind(this)} />
                              <Button onClick={() => this.onReply(store.getState().comment.comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                        }
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                );
              })
            }
            
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  commentText: state.comment.comment.commentText,
  commentId: state.comment.comment.commentId,
  showReply: state.comment.showReply,
  nestedComments: state.comment.comment.nestedComments,
  nestedCommentsCopy: state.comment.comment.nestedCommentsCopy
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComment);