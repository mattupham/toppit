import React from 'react';
import MyComment from './Comment.jsx';
import {Button, Header, Comment, Container, Form} from 'semantic-ui-react';
import store from '../js/store.js';
import http from 'axios';
import { setTopicComments } from '../js/actions/topicListActions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let topicId = store.getState().topicList.selectedTopic._id;
    http.get(`/api/topic/${topicId}`)
      .then((data) => {
        console.log(data);
        this.props.setTopicComments(data.data.commentId);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    console.log(store.getState().topicList.commentList);
    let commentList = store.getState().topicList.commentList;

    return (
      <Comment.Group>
        <Header as="h3" dividing>Comments</Header>
        {commentList.map( (comment, index) => (
          <MyComment comment={comment} key={index} />
        )
        )}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => ({
  commentList: state.topicList.commentList
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setTopicComments }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);