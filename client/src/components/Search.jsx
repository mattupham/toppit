import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSearchValue, toggleIsLoading } from '../js/actions/searchActions.js';
import { changeSearchedList, changeFilteredList } from '../js/actions/topicListActions.js';

import { bindActionCreators } from 'redux';

import store from '../js/store.js';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    var searchValue = (store.getState().search.searchValue).toLowerCase();
    this.props.toggleIsLoading();
    setTimeout(() => {
      this.props.toggleIsLoading();
    }, 1000)    
    var topicListCopy = store.getState().topicList.fullTopicList;
    console.log('full topic list', topicListCopy)
    var filteredArr = topicListCopy.filter(topic => {
      if (topic.headline.toLowerCase().includes(searchValue) || 
        topic.description.toLowerCase().includes(searchValue) || 
        topic.authorId.username.toLowerCase().includes(searchValue)) {
          return topic;
      }
    });
    this.props.changeSearchedList(filteredArr);
    this.props.changeFilteredList(filteredArr);    
  }

  handleChange(e) {
    this.props.setSearchValue(e.target.value);
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Input  focus placeholder='Search...' onChange={this.handleChange} />
        <Button icon type='submit'color='blue' size='large' compact loading={store.getState().search.isLoading}>
          <Icon name='search' />
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  searchValue: state.search.searchValue,
  isLoading: state.search.isLoading,
  fullTopicList: state.topicList.fullTopicList
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setSearchValue, toggleIsLoading, changeSearchedList, changeFilteredList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
