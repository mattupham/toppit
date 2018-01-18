import React from 'react';
import Topic from './Topic.jsx';
import {Container} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';



const TopicList = (props) => {
  var topicList = store.getState().topicList.filteredTopicList;
  console.log('in topic list....', topicList)
  return (
    <Container>
      {topicList.map((topic) => (
        <Topic {...props}
          topic={topic} 
          key={topic._id} 
          // upVote={props.upVote}
          // currentUser={props.currentUser} 
        />))}
    </Container>
  )
}


const mapStateToProps = (state) => ({
  filteredTopicList: state.topicList.filteredTopicList
});

export default connect(mapStateToProps)(TopicList);


