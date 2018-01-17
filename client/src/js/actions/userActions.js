// import * as user from '../userActions';
// user.setUsername('user2');
// export const fetchUser = () => {
//   return {
//     type: 'FETCH_USER_FULFILLED',
//     payload: {
//       username: 'user',
//       password: 1234,
//     }
//   };
// };
export const setUserId = (id) => {
  console.log(id, ' in actions');
  return {
    type: 'SET_USER_ID',
    payload: id
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
export const setUserConfirm = (confirm) => {
  console.log(confirm, ' in actions');
  return {
    type: 'SET_USER_CONFIRM',
    payload: confirm
  };
};
export const setUserPwStrength = (pwStrength) => {
  console.log(pwStrength, ' in actions');
  return {
    type: 'SET_USER_PW_STRENGTH',
    payload: pwStrength
  };
};
export const setUserPwStrengthColor = (pwStrengthColor) => {
  console.log(pwStrengthColor, ' in actions');
  return {
    type: 'SET_USER_PW_STRENGTH_COLOR',
    payload: pwStrengthColor
  };
};
export const setUserPwStrengthPhrase = (pwStrengthPhrase) => {
  console.log(pwStrengthPhrase, ' in actions');
  return {
    type: 'SET_USER_PW_STRENGTH_PHRASE',
    payload: pwStrengthPhrase
  };
};
export const setUserPwError = (pwError) => {
  console.log(pwError, ' in actions');
  return {
    type: 'SET_USER_PW_ERROR',
    payload: pwError
  };
};
export const setUsernameError = (usernameError) => {
  console.log(usernameError, ' in actions');
  return {
    type: 'SET_USERNAME_ERROR',
    payload: usernameError
  };
};
export const setSignInError = (signInError) => {
  console.log(signInError, ' in actions');
  return {
    type: 'SET_SIGN_IN_ERROR',
    payload: signInError
  };
};
export const setSignUpError = (signUpError) => {
  console.log(signUpError, ' in actions');
  return {
    type: 'SET_SIGN_UP_ERROR',
    payload: signUpError
  };
};