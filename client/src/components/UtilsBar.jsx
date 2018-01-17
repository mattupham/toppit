import React from 'react';
import SortList from './SortList.jsx';
import FilterList from './FilterList.jsx';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectFilter, selectSort } from '../js/actions/utilsBarActions.js';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';

class UtilsBar extends React.Component {
  constructor(props) {
    super(props);

    // this.state = ({
    //   filterBy: props.defaultFilter,
    //   sortBy: props.defaultSort
    // });
  }
  
  onSortChange(sortBy) {
    //where to select current sort?
    //CHANGED, creates sort value by getting current state for sort
    let sort = store.getState().utilsBar.utilsBar.sortBy;

    // this.state.sortBy = sortBy;

    //CHANGED, onDropdownChange accesses sort value
    this.props.onDropdownChange(sort.sortBy);
  }

  onFilterChange(filterBy) {
    //CHANGED, creates filter value by getting current state for filter
    let filter = store.getState().utilsBar.utilsBar.filterBy;
    // this.state.filterBy = filterBy;

    //CHANGED, onDropdownChange accesses filter value
    this.props.onDropdownChange(filter.filterBy);
  }

  render() {
    return (
      <Menu secondary>
        <Menu.Item position='right'>
          <SortList  
            defaultSort={this.props.defaultSort} 
            onSortChange={this.onSortChange.bind(this)}/>
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item>
            <FilterList 
              defaultFilter={this.props.defaultFilter}
              onFilterChange={this.onFilterChange.bind(this)}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

//CHANGED, how to access filterBy
const mapStateToProps = (state) => ({
  //change to correct values
  filter: state.utilsBar.filterBy,
  sort: state.utilsBar.sortBy
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectFilter, selectSort }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilsBar);
// export default UtilsBar;