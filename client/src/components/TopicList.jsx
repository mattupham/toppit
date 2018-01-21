import React from 'react';
import Topic from './Topic.jsx';
import {Container} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';

class TopicList extends React.Component {
  // var topicList = store.getState().topicList.filteredTopicList;
  // console.log('topic list props....', props);

  constructor(props) {
    super(props);
    this.subtoppit = this.props.match.params.subtoppit;
    this.topicList = [];
  }  

  componentDidMount() {
    this.props.getAllTopicsInSubtoppit(this.subtoppit);
  }  

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.subtoppit !== nextProps.match.params.subtoppit) {
      this.subtoppit = nextProps.match.params.subtoppit;
      this.props.getAllTopicsInSubtoppit(this.subtoppit);
    }
  }

  render() {
    // this.subtoppit = this.props.match.params.subtoppit;
    if (this.subtoppit && this.props.subtoppitList[0]) {
      console.log('setting to subtoppit list!....');
      this.topicList = this.props.subtoppitList;
    } else {
      this.topicList = this.props.filteredTopicList;
    }
    return (
      <Container>
        {this.topicList.map((topic, index) => (
          <Topic {...this.props}
            topic={topic} 
            key={index} 
            // upVote={props.upVote}
            onDetailedTopic={this.props.onDetailedTopic}
          />))}
      </Container>
    );
  }  
};


const mapStateToProps = (state) => ({
  filteredTopicList: state.topicList.filteredTopicList,
  subtoppitList: state.topicList.subtoppitList
});

export default connect(mapStateToProps)(TopicList);


