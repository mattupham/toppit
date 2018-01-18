import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import UtilsBar from './UtilsBar.jsx';
import TopicDetailed from './TopicDetailed.jsx';
import axios from 'axios';
import { Menu, Image, Sticky } from 'semantic-ui-react';
import Logo from '../images/logo.png';

var http = axios.create({
  withCredentials: true,
});

import {Link, Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Button, Container, Header} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';
import { setUserId } from '../js/actions/userActions.js';
import { displayNewTopic } from '../js/actions/topicActions.js';
import { addTopicToList, addTopicToListFront, changeViewedList, setSelectedTopic } from '../js/actions/topicListActions.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   topicList: [],
    //   filterBy: '',
    //   sortBy: 'timeStamp',
    //   // search: ''
    // };

    this.createNewTopic = this.createNewTopic.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
    this.closeNewTopic = this.closeNewTopic.bind(this);
    this.getAllTopics = this.getAllTopics.bind(this);
    this.upVote = this.upVote.bind(this);
    this.onDetailedTopic = this.onDetailedTopic.bind(this);
    this.getSelectTopics = this.getSelectTopics.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser()
      .then(() => (
        this.getAllTopics()))
      .catch( (err) => console.log(err.message));
  }

  getAllTopics() {
    //**need to set these in redux
    // this.setState({
    //   filterBy: '',
    //   sortBy: 'timeStamp'
    // });
    console.log('getting all topics')
    return http.get('/api/topics')

      .then(({ data }) => {
        this.props.changeViewedList(data);
        
        data.forEach(topic => {
          this.props.addTopicToList(topic)
        });
      })


      .catch((err) => {
        console.log(err.message);
      });
  }

  getCurrentUser() {
    return http.get('/api/user/current')

      .then(({data}) => {
        console.log('Current User ', data);
        this.props.setUserId(data._id);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
  
  //any change in viewed list goes through this
  getSelectTopics(query, search) {
    if (query) {
      //**also fix here 
      //use this.props.changeViewedList(arrayOfTopics)
      // this.setState({
      //   filterBy: query.filterBy,
      //   sortBy: query.sortBy
      // });
      
    } else {
      //**also fix here
      query = {
        // filterBy: this.state.filterBy,
        // sortBy: this.state.sortBy,
      };
    }
    http.get('/api/topics', {params: query})

      .then(({data}) => {
        if (search) {
          var filteredData = data.filter((item) => item.headline.toLowerCase().includes(search.toLowerCase()))
        }
        //**also fix here
        // this.setState({
        //   topicList: filteredData || data,
        //   // search: search
        // });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }


  createNewTopic() {
    this.props.displayNewTopic(true);
  }

  closeNewTopic() {
    this.props.displayNewTopic(false);
  }

  
  onNewTopic (topic) {
    //do server request to add new topic to database 
    //then get new topic and render new list to topic list.

    this.props.displayNewTopic(false);

    http.post('/api/topic', topic)

      .then(({data}) => {
        //** need to rerender page
        this.props.addTopicToListFront(data);
        this.props.changeViewedList(store.getState().topicList.fullTopicList)
        console.log('Successfully posted ', data);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  onDetailedTopic(topic) {
    // this.setState({
    //   selectedTopic: topic
    // });
    this.props.setSelectedTopic(topic);
  }

  upVote (topicId, currentUser, increment) {
    http.patch(`/api/topic/${topicId}`, {
      upvotes: increment,
      currentUser: currentUser
    })      
      .then( ({data}) => {
        // function to be implemented to get all topics
        this.getSelectTopics();
      })
      .catch( (error) => {
        console.log(error);
      });
    
  }

  downVote (topicId) {

  }  

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    // const { contextRef } = this.state;
    // console.log(this.props.user.username);
    // console.log(this.props.user.password);
    let topic = store.getState().topic.topic;
    return (
      <div className='mainapp'>
        <NavBar 
          // currentUser={this.state.currentUser}
          history={this.props.history} 
          home={this.getAllTopics} 
          createNewTopic={this.createNewTopic}
          onSearch={this.getSelectTopics}
        />
        <Switch>
          <Route path='/share' render={(props) => (
            <Container>
              <NewTopic {...props}
                // currentUser={this.state.currentUser}
                onNewTopic={this.onNewTopic}
                active={topic.displayNewTopic}
                closeNewTopic={this.closeNewTopic}
              />
            </Container>
          )}/>
          <Route exact path='/' render={(props) => (
            <div>
              <Container>
                <UtilsBar 
                  // defaultFilter={this.state.filterBy} 
                  // defaultSort={this.state.sortBy} 
                  onDropdownChange={this.getSelectTopics}/>
                <TopicList {...props} 
                  // currentUser={this.state.currentUser}
                  // upVote={this.upVote} 
                  onDetailedTopic={this.onDetailedTopic} 
                  // topicList={this.state.topicList} 
                />
              </Container>
            </div>
          )}/>
          <Route path='/topic/:topicId' render={(props) => (
            <Container>
              <TopicDetailed {...props} 
                // currentUser={this.state.currentUser}
                topicId={props.match.params.topicId} 
                upvote={this.upVote}/>
            </Container>
          )}/>
        </Switch>
        <Menu attached='bottom' className='footer'>
          <Menu.Item >
            {/* <h1>{this.props.user.username}</h1> */}
            <i className="copyright icon"></i><p>2018 Prospective Technologies, Inc. All Rights Reserved.</p>
          </Menu.Item> 
          <Menu.Item className="toTop button" onClick={this.topFunction} >
            <i className="arrow up icon"></i>
          </Menu.Item>
          <Menu.Item >
            <img className="logo" src={Logo} />
          </Menu.Item> 
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  displayNewTopic: state.topic.displayNewTopic,
  id: state.user.id,
  viewedTopicList: state.topicList.viewedTopicList,
  selectedTopic: state.topicList.selectedTopic
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ displayNewTopic, setUserId, addTopicToList, 
    addTopicToListFront, changeViewedList, setSelectedTopic }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);