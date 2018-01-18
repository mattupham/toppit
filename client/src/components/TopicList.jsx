import React from 'react';
import Topic from './Topic.jsx';
import {Container} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';



const TopicList = (props) => {
  var topicList = store.getState().topicList.viewedTopicList;
  console.log('in topic list....', topicList)
  return (
    <Container>
      {topicList.map((topic) => (
        <Topic {...props}
          topic={topic} 
          key={topic._id} 
          // upVote={props.upVote}
          // currentUser={props.currentUser} 
          onDetailedTopic={props.onDetailedTopic}
        />))}
    </Container>
  );
};


const mapStateToProps = (state) => ({
  viewedTopicList: state.topicList.viewedTopicList
});

export default connect(mapStateToProps)(TopicList);


