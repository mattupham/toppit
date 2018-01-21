import React from 'react';
import MyComment from './Comment.jsx';
import {Button, Header, Comment, Container, Form} from 'semantic-ui-react';
import store from '../js/store.js';
import http from 'axios';
import { setTopicComments } from '../js/actions/topicListActions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNestedCommentsCopy } from '../js/actions/commentActions.js';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let topicId = store.getState().topicList.selectedTopic._id;

    // http.get(`/api/topic/${topicId}`)
    //   .then((data) => {
    //     console.log('This is the list of all comments', data);
    //     this.props.setTopicComments(data.data.commentId);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // if (this.props.comments) {
    //   let promises = this.props.comments.map((comment) => {
    //     console.log(comment);
    //     return http.get(`/api/comments/${comment}`)
    //       .then((nested) => {
    //         // console.log('This is the nested comment', nested.data);
    //         // this.props.addNestedToFront(nested.data);
    //         comment = nested.data;
    //         return comment;
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   });
    //   Promise.all(promises)
    //     .then((data) => {
    //       console.log(data);
    //       // this.props.setNestedCommentsCopy(data);
    //       // this.props.addNestedToFront(data[data.length - 1]);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
  }
  render() {
    // console.log(store.getState().topicList.commentList);
    // let commentList = store.getState().topicList.commentList;
    // console.log('This is the commentlist', commentList);
    let nested = store.getState().comment.nestedCommentsCopy;
    console.log('Nested in commentList', nested);
    console.log(this.props.comments, this.props.comments.length);
    return (
      <Comment.Group>
        {this.props.comments.map((comment, index) => (
          comment.comments && <MyComment comment={comment} key={index} comments={comment.comments}/>
        )
        )}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => ({
  commentList: state.topicList.commentList,
  nestedCommentsCopy: state.comment.nestedCommentsCopy
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setTopicComments, setNestedCommentsCopy }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
// export default CommentList;