/**
 * Created by Vitaliy on 03.10.2016.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Groups} from '../../../Common/Consts'
import {Link} from 'react-router'
import {setGroup} from '../../modules/Product/ProductActions'

import styles from './GroupFilter.css';

class GroupFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {group: ''}
  }

  onChangeGroup = (url) => {
    this.props.dispatch(setGroup(url));
  }

  render() {
    return (
      <div className={styles['groups-list']}>
        <Link to={`/products`}
              onClick={this.onChangeGroup.bind(null, '')}>
          All
        </Link>
        {Groups.map((group) =>
          <Link to={`/products/group/${group.url}`}
                key={group.url}
                onClick={this.onChangeGroup.bind(null, group.url)}>
            {group.name}
          </Link>)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    group: state.products.group
  };
}


export default connect(mapStateToProps)(GroupFilter);

