import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
// import store from '../js/store.js';
import { connect } from 'react-redux';
import store from '../js/store.js';

// import { toggleVote } from '../js/actions/voteActions.js' 

class UpvoteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  checkifUserHasUpvoted () {
    var boolean = false;
    if (this.props.currentUser && this.props.topic.upvoteUsers.includes(this.props.currentUser.id)) {
      boolean = true;
    }
    return boolean;
  }  

  handleClick() {
    console.log('store right after click...', store.getState());
    var changeInVotes = 1;
    if (this.props.currentUser && this.props.topic.upvoteUsers.includes(this.props.currentUser.id)) {
      changeInVotes = -1;
    }
    var newVoteCount = this.props.topic.upvotes + changeInVotes;
    this.props.upVote(this.props.topic._id, this.props.currentUser.id, newVoteCount, changeInVotes);
  }

  render() {
    this.upvoted = this.checkifUserHasUpvoted();
    return (
      <Button
        color={this.upvoted ? 'blue' : 'grey'} 
        content="UpVote"
        icon='heart'
        label={{ as: 'a', basic: true, content: this.props.topic.upvotes || 0}}
        labelPosition='right'
        onClick={ this.handleClick.bind(this)}
      />   
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.user
});

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ toggleVote }, dispatch);
// };

export default connect(mapStateToProps)(UpvoteButton);