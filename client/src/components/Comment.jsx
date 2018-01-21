import React from 'react';
import { Button, Comment, Form, Card, Header } from 'semantic-ui-react';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';
import store from '../js/store.js';
import http from 'axios';
import { connect } from 'react-redux';
import CommentList from './CommentList.jsx';
import { bindActionCreators } from 'redux';
import { setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy, addNestedToFront } from '../js/actions/commentActions';

class MyComment extends React.Component {
  constructor(props) {
    super(props);
    this.onReply = this.onReply.bind(this);
  }
  componentDidMount() {
    console.log(this.props.comment.comments);
    this.getAllComments();
  }
  getAllComments() {
    let topicId = store.getState().topicList.selectedTopic._id;
    let author = this.props.comment.authorId.username || this.props.comment.authorUsername;
    let text = this.props.comment.text;
    // console.log(text);
    let nestedComments = [];

    http.get(`/api/comments/${topicId}/${author}`, { params: { text: this.props.comment.text }})
      .then((comment) => {
        // console.log('Got the comment!', comment);
        this.props.setCommentId(comment.data._id);
        
        if (this.props.comments) {
          let promises = this.props.comments.map((commentId) => {
            // console.log(comment);
            return http.get(`/api/comments/${commentId}`)
              .then((nested) => {
                // console.log('This is the nested comment', nested.data);
                // this.props.addNestedToFront(nested.data);
                comment = nested.data;
                return comment;
              })
              .catch((err) => {
                console.error(err);
              });
          });
          Promise.all(promises)
            .then((data) => {
              console.log(data);
              this.props.setNestedCommentsCopy(data);
              // this.props.addNestedToFront(data[data.length - 1]);
            })
            .catch((err) => {
              console.error(err);
            });
        }
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
    let parentIdToStore;
    // console.log(this.props.comment.comments);
    // let nested = this.props.comment.comments.map((id) => {
    //   return http.get(`/api/comments/${id}`)
    //     .then((comment) => {
    //       // console.log('This is the nested comment', nested.data);
    //       console.log(comment);
    //       return comment.data;
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // });
    // // let nestedArray = [];
    // Promise.all(nested)
    //   .then((data) => {
    //     // nestedArray = data;
    //     this.nestComment(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
        this.props.setShowReply(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  nestComment(nested) {
    console.log(nested);
    let parentId;
    for (var i = 0; i < nested.length; i++) {
      // if ()
      parentId = nested[i]._id;
    }
    let comment = {
      text: store.getState().comment.commentText,
      timeStamp: new Date(),
      authorId: { _id: store.getState().user.user.id, username: store.getState().user.user.username },
      authorUsername: store.getState().user.user.username,
      parentId: this.props.comment._id,
      comments: []
    };
    console.log('Comment in component',comment);
    let topicId = store.getState().topicList.selectedTopic._id;
    http.post(`/api/topic/${topicId}/${this.props.comment._id}`, comment)
      .then((data) => {
        console.log('Data', data);
        this.getAllComments();
        this.props.setShowReply(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    // console.log(this.props.comment);
    let comment = this.props.comment;
    // console.log(this.props.comments);
    let parent = store.getState().comment;
    let nested = store.getState().comment.nestedCommentsCopy;
    let nestedComments = [];

    // if (nested.length > 0) {
    //   nestedComments = nested.map((child, index) => (
    //     child.comments && 
    //       <MyComment
    //         comment={child}
    //         key={index}
    //         comments={child.comments}
    //       />
    //   ));
    // }
    console.log('Nested in comment', nested);
    return (
      <div>
        <Comment.Group>
          <Comment>
            <Comment.Avatar className='commentuser' src={defaultPhoto} />
            <Comment.Content>
              <Comment.Author as='a'>{(comment.authorId.username) ? comment.authorId.username : comment.authorUsername}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(comment.timeStamp).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={this.toggleShowParentReply.bind(this)}>Reply</Comment.Action>
              </Comment.Actions>
              {
                (parent.showReply) &&
                  <Form reply className="replyTextArea">
                    <Form.TextArea onChange={this.handleInputText.bind(this)} />
                    <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                  </Form>
              }
              {/* {
                this.props.comment.comments && nested.map((child, index) => (
                  <MyComment comment={child} key={index} comments={child.comments} onClick={this.toggleShowNestedReply.bind(this)}/>
                ))
              } */}
              { comment.comments && comment.comments.length > 0 && <CommentList comments={comment.comments} /> }
              {/* {
                this.props.comment.comments && this.props.comment.comments.length > 0 && nested.map((child, index) => {
                  console.log(child, index);
                  return (
                    <Comment.Group key={index}>
                      <Comment>
                        <Comment.Avatar src={defaultPhoto} />
                        <Comment.Content>
                          <Comment.Author as='a'>{child.authorUsername}</Comment.Author>
                          <Comment.Metadata>
                            <div>{moment(child.timeStamp).fromNow()}</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            {child.text}
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action onClick={this.toggleShowNestedReply.bind(this)}>Reply</Comment.Action>
                          </Comment.Actions>
                          {
                            (parent.showReply) &&
                            <Form reply className="replyTextArea">
                              <Form.TextArea onChange={this.handleInputText.bind(this)} />
                              <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                          }
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  );
                })
              } */}
              {
                (store.getState().comment.showReply) &&
                <Form reply className="replyTextArea">
                  <Form.TextArea onChange={this.handleInputText.bind(this)} />
                  <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
              }
            </Comment.Content>
          </Comment>
        </Comment.Group>
        {/* {
          nestedComments
        } */}
        
        {/* <CommentList comments={comment.comments} />; */}
        {/* {
          comment.comments && comment.comments.length > 0 && nested.map((child) => {
            return <MyComment key={child._id} comment={child} />;
          })
        } */}
      </div>
    );

    // let comment = this.props.comment;
    // // let name = (this.props.comment.authorId && (this.props.comment.authorId.fullName || this.props.comment.authorId.username) || '');
    // // let photoUrl = (this.props.comment.authorId && this.props.comment.authorId.photo) || defaultPhoto;
    // console.log('Nested comment list', comment.comments);
    // let nested = store.getState().comment.nestedCommentsCopy;
    // let parent = store.getState().comment;
    // console.log(nested);
    // return (
    //   <div>
    //     {
    //       this.props.comment.
    //     }
    //     <Comment.Group>
    //       <Comment>
    //         <Comment.Avatar className='commentuser' src={defaultPhoto} />
    //         <Comment.Content>
    //           <Comment.Author as='a'>{comment.username}</Comment.Author>
    //           <Comment.Metadata>
    //             <div>{moment(comment.timeStamp).fromNow()}</div>
    //           </Comment.Metadata>
    //           <Comment.Text>{comment.text}</Comment.Text>
    //           <Comment.Actions>
    //             <Comment.Action onClick={this.toggleShowParentReply.bind(this)}>Reply</Comment.Action>
    //           </Comment.Actions>
    //           {
    //             (store.getState().comment.showReply) &&
    //               <Form reply className="replyTextArea">
    //                 <Form.TextArea onChange={this.handleInputText.bind(this)} />
    //                 <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
    //               </Form>
    //           }
    //           {
    //             comment.comments && comment.comments.length > 0 && nested.map((child, index) => {
    //               console.log(child, index);
    //               return (
    //                 <Comment.Group key={index}>
    //                   <Comment>
    //                     <Comment.Avatar src={defaultPhoto} />
    //                     <Comment.Content>
    //                       <Comment.Author as='a'>{child.authorUsername}</Comment.Author>
    //                       <Comment.Metadata>
    //                         <div>{moment(child.timeStamp).fromNow()}</div>
    //                       </Comment.Metadata>
    //                       <Comment.Text>
    //                         {child.text}
    //                       </Comment.Text>
    //                       <Comment.Actions>
    //                         <Comment.Action onClick={this.toggleShowNestedReply.bind(this)}>Reply</Comment.Action>
    //                       </Comment.Actions>
    //                       {
    //                         (parent.showReply) &&
    //                           <Form reply className="replyTextArea">
    //                             <Form.TextArea onChange={this.handleInputText.bind(this)} />
    //                             <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
    //                           </Form>
    //                       }
    //                     </Comment.Content>
    //                   </Comment>
    //                 </Comment.Group>
    //               );
    //             })
    //           }
    //         </Comment.Content>
    //       </Comment>
    //     </Comment.Group>
    //   </div>
    // );
  }
}
const mapStateToProps = (state) => ({
  commentText: state.comment.commentText,
  commentId: state.comment.commentId,
  showReply: state.comment.showReply,
  nestedComments: state.comment.nestedComments,
  nestedCommentsCopy: state.comment.nestedCommentsCopy
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy, addNestedToFront }, dispatch);
};

var NestedComment = connect(mapStateToProps, mapDispatchToProps)(MyComment);
export default NestedComment;
// export default connect(mapStateToProps, mapDispatchToProps)(MyComment);