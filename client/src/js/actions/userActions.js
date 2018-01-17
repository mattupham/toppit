// import * as user from '../userActions';
// user.setUsername('user2');

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';

export const fetchUser = () => {
  return {
    type: 'FETCH_USER_FULFILLED',
    payload: {
      username: 'user',
      password: 1234
    }
  };
};

export const setUsername = (username) => {
  console.log(username, ' in actions');
  return {
    type: 'SET_USER_NAME',
    payload: username
  };
};

export const setUserPassword = (password) => {
  console.log(password, ' in actions');
  return {
    type: 'SET_USER_PASSWORD',
    payload: password
  };
};