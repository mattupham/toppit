import React from 'react';
import MyComment from './Comment.jsx';
import {Button, Header, Comment, Container, Form} from 'semantic-ui-react';
import store from '../js/store.js';

// const CommentList = (props) => (
//   <Comment.Group>
//     <Header as="h3" dividing>Comments</Header>
//     {props.comments.map( (comment, index) => (
//       <MyComment comment={comment} key={index} />
//     )
//     )}
//   </Comment.Group>
// );

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let commentList = store.getState().topicList.selectedTopic.commentId;
    console.log(this.props.comments);
    return (
      <Comment.Group>
        <Header as="h3" dividing>Comments</Header>
        {this.props.comments.map( (comment, index) => (
          <MyComment comment={comment} key={index} />
        )
        )}
      </Comment.Group>
    );
  }
}


export default CommentList;