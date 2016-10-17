/**
 * Created by Vitaliy on 17.10.2016.
 */

import React, {PropTypes, Component} from 'react';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import callApi from '../../../../util/apiCaller';

import {getUserInfo} from '../../UserActions'
import {updateUserRequest} from '../../UserActions'


export class UserProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', isAdmin: false}
    //this.getUserInfo(localStorage.authentication_token)
    this.props.dispatch(getUserInfo(this))
  }

  /// getUserInfo moved to UserActions
  /*getUserInfo = (token) => {
   var component = this;
   return callApi(`tokenInfo?access_token=${token}`).then(res => {
   component.setState({email: res.email});
   component.setState({isAdmin: res.isAdmin});
   });
   }*/

  onChangeЕmail = (e) => {
    this.setState({email: e.target.value});
  };

  onChangeIsAdmin = (e) => {
    this.setState({isAdmin: e.target.checked});
  };

  updateUser = ()=> {
    let user = {
      email: this.state.email,
      isAdmin: this.state.isAdmin,
      access_token: localStorage.authentication_token
    };
    this.props.dispatch(updateUserRequest(user))
  };

  render() {
    return (
      <div>
        <input placeholder="email"
               value={this.state.email}
               onChange={this.onChangeЕmail}
               name="email"/>
        <input type="checkbox"
               placeholder="isAdmin"
               checked={this.state.isAdmin}
               onChange={this.onChangeIsAdmin}
               name="isAdmin"/>
        <label htmlFor="isAdmin">Admin</label>
        <a href="#" onClick={this.updateUser}><FormattedMessage
          id="submit"/></a>
      </div>
    );
  }
}

UserProfilePage.propTypes = {
  intl: intlShape.isRequired,
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(UserProfilePage);
