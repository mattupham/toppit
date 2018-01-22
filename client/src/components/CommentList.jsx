import React from 'react';
import MyComment from './Comment.jsx';
import defaultPhoto from '../images/defaultPhoto.jpg';
import {Button, Header, Comment, Container, Form} from 'semantic-ui-react';
import store from '../js/store.js';
import http from 'axios';
import { setTopicComments } from '../js/actions/topicListActions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { setNestedCommentsCopy } from '../js/actions/commentActions.js';
import CommentGroup from 'semantic-ui-react/dist/commonjs/views/Comment/CommentGroup';

import moment from 'moment';
import { setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy, addNestedToFront, setContainsObj } from '../js/actions/commentActions.js';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // let topicId = store.getState().topicList.selectedTopic._id;
    // this.setCommentList();
  }
  setCommentList(comment) {
    console.log(comment);
    // this.props.setContainsObj(!store.getState().comment.containsObj);
    // console.log(store.getState().comment.containsObj);
    if (store.getState().comment.containsObj === true) {
      let topicId = store.getState().topicList.selectedTopic._id;
      let author = comment.authorId.username || comment.authorUsername;
      let text = comment.text;
      // console.log(text);
      let nestedComments = [];

      http.get(`/api/comments/${topicId}/${author}`, { params: { text: comment.text }})
        .then((commentData) => {
          console.log('Got the comment!', commentData);
          // comment.props.setCommentId(commentData.data._id);
          
          if (this.props.comment) {
            let promises = this.props.comment.comments.map((commentId) => {
              console.log(commentId);
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
                this.props.setContainsObj(true);
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
    // if (store.getState().comment.containsObj === false) {
    //   console.log('Yes it is a string');
    //   let promises = this.props.comments.map((commentId) => {
    //     console.log(commentId);
    //     return http.get(`/api/comments/${commentId}`)
    //       .then((nested) => {
    //         console.log('This is the nested comment', nested.data);
    //         // this.props.addNestedToFront(nested.data);
    //         let comment = nested.data;
    //         return comment;
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   });
    //   Promise.all(promises)
    //     .then((data) => {
    //       console.log(data);
    //       this.props.setNestedCommentsCopy(data);
    //       this.props.setContainsObj(true);
    //       // this.props.addNestedToFront(data[data.length - 1]);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } else {
    //   console.log('Yes it is an object');
    //   // this.props.setContainsObj(true);
    // }
  }
  toggleShowParentReply() {
    let comment = store.getState().comment;
    this.props.setShowReply(!comment.showReply);
  }
  render() {
    // console.log(store.getState().topicList.commentList);
    // let commentList = store.getState().topicList.commentList;
    // console.log('This is the commentlist', commentList);
    console.log(this.props.comments);
    let nested = store.getState().comment.nestedCommentsCopy;
    console.log('Nested in commentList', nested);
    let comment = store.getState().comment;
    console.log(this.props.comments, this.props.comments.length, this.props.comments[0]);
    // return (
    //   <Comment.Group>
    //     {this.props.comments.map((comment, index) => (
    //       comment.comments && comment.comments.length > 0 &&
    //       <MyComment 
    //         comment={comment} 
    //         key={index} 
    //         comments={(typeof comment.comments[0] === 'String') ? nested : comment.comments}
    //       />
    //     )
    //     )}
    //   </Comment.Group>
    // );
    return (
      <CommentGroup>
        {
          this.props.comments.map((comment, index) => (
            <div>
              <MyComment comment={comment} />
              <Comment.Group key={index}>
                {/* {
                  this.setCommentList(comment)
                } */}
                {/* <Comment>
                  <Comment.Avatar className='commentuser' src={defaultPhoto} />
                  <Comment.Content>
                    <Comment.Author as='a'>{comment.username}</Comment.Author>
                    <Comment.Metadata>
                      <div>{moment(comment.timeStamp).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={this.toggleShowParentReply.bind(this)}>Reply</Comment.Action>
                    </Comment.Actions> */}
                    {/* {
                      (parent.showReply) &&
                        <Form reply className="replyTextArea">
                          <Form.TextArea onChange={this.handleInputText.bind(this)} />
                          <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                    } */}
                    {/* {
                      comment.comments && comment.comments.length > 0 && nested.map((child, index) => (
                        <MyComment comment={child} key={index} comments={child.comments} onClick={this.toggleShowNestedReply.bind(this)}/>
                      ))
                    } */}
                    {/* {
                      (comment.comments && comment.comments.length > 0 && this.props.comments[0] === 'String') 
                        ? <CommentList comments={nested} /> 
                        : <CommentList comments={comment.comments} />
                    } */}
                    {/* {this.props.comments.map((comment, index) => (
                      comment.comments && comment.comments.length > 0 &&
                      <MyComment 
                        comment={comment} 
                        key={index} 
                        comments={(typeof comment.comments[0] === 'String') ? nested : comment.comments}
                      />
                    )
                    )} */}
                    {/* {
                      (store.getState().comment.showReply) &&
                      <Form reply className="replyTextArea">
                        <Form.TextArea onChange={this.handleInputText.bind(this)} />
                        <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                      </Form>
                    } */}
                  {/* </Comment.Content> */}
                {/* </Comment> */}
              </Comment.Group>
            </div>
          ))
        }
      </CommentGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  commentList: state.topicList.commentList,
  nestedCommentsCopy: state.comment.nestedCommentsCopy,
  containsObj: state.comment.containsObj
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setTopicComments, setNestedCommentsCopy, setContainsObj }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);