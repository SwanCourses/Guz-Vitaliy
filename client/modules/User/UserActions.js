/**
 * Created by Vitaliy on 17.10.2016.
 */

import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users/registration', 'post', { user }).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function updateUserRequest(user) {
  return (dispatch) => {
    return callApi('users/update', 'post', { user }).then(res => {
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function signInRequest(creds) {
  return (dispatch) => {
    return callApi('auth', 'post', creds).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function getUserInfo(component) {
  return (dispatch) => {
    return callApi(`tokenInfo?access_token=${localStorage.authentication_token}`).then(res => {
      component.setState({email: res.email});
      component.setState({isAdmin: res.isAdmin});
    });
  };
}



