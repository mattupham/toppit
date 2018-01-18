import React from 'react';
import SortList from './SortList.jsx';
import FilterList from './FilterList.jsx';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFilter, setSort } from '../js/actions/utilsBarActions.js';
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
    console.log('onSortChange', sortBy)
    //sets sort stat with sortBy value
    this.props.setSort(sortBy);

    //where to select current sort?
    //CHANGED, creates sort value by getting current state for sort
    //ACCESSING CORRECT OBJECT
    // let sort = store.getState().utilsBar.sort.sortBy;
    // console.log('sort', sort);
    // this.state.sortBy = sortBy;
    

    //CHANGED, onDropdownChange accesses sort value
    this.props.onDropdownChange(sort);
  }

  onFilterChange(filterBy) {
    //CHANGED, creates filter value by getting current state for filter
    //ACCESSING CORRECT OBJECT
    let filter = store.getState().utilsBar.filter.filterBy;
    console.log('filter', filter);
    // this.state.filterBy = filterBy;

    //CHANGED, onDropdownChange accesses filter value
    // this.props.onDropdownChange(filter);
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
  filter: state.filter,
  sort: state.sort
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFilter, setSort }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilsBar);
// export default UtilsBar;