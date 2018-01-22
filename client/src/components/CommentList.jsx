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
  render() {
    // console.log(this.props.comments);
    let comment = store.getState().comment;
    return (
      <CommentGroup>
        {
          this.props.comments.map((comment, index) => (
            comment.comments && <MyComment key={index} comment={comment} comments={comment.comments} />
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