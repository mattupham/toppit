import React from 'react';
import { Form, Button, Icon, Input, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSearchValue, toggleIsLoading } from '../js/actions/searchActions.js';
import { bindActionCreators } from 'redux';

import store from '../js/store.js';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    this.props.toggleIsLoading();
    setTimeout(() => {
      this.props.toggleIsLoading();
    }, 1000)
    console.log('this is being searched:', store.getState().search.searchValue);    
    this.props.onSearch(null, store.getState().search.searchValue);
    this.props.setSearchValue('');
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
  isLoading: state.search.isLoading
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setSearchValue, toggleIsLoading }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
