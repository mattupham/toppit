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
    console.log('onSortChange sortBy value', sortBy)
    //sets sort state with sortBy value
    this.props.setSort(sortBy);
    //FIGURE OUT HOW TO RE-RENDER ONSORTCHANGE FUNCTION
  }

  onFilterChange(filterBy) {
    console.log('onFilterChange filterBy value', filterBy)
    //sets filter state with filterBy value
    this.props.setFilter(filterBy);
    //FIGURE OUT HOW TO RE-RENDER SETFILTER FUNCTION
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

const mapStateToProps = (state) => ({
  filter: state.filter,
  sort: state.sort
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFilter, setSort }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilsBar);
// export default UtilsBar;