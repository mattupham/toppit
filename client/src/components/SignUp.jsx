import React from 'react';
import { Segment, Button, Divider, Message, Menu, Form, Progress, Header, Container, Card, Grid } from 'semantic-ui-react';
import owasp from 'owasp-password-strength-test';
import { connect } from 'react-redux';
import { 
  setUsername, setUserPassword, setUserPwStrength, 
  setUserPwStrengthColor, setUserPwStrengthPhrase, 
  setUsernameError, setUserPwError, setUserConfirm, fetchUser
} from '../js/actions/userActions.js';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';

const colors = {
  '1': ['red', 'weak'],
  '2': ['red', 'weak'],
  '3': ['orange', 'weak'],
  '4': ['orange', 'ok'],
  '5': ['green', 'ok'],
  '6': ['green', 'good'],
  '7': ['green', 'strong']
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    // Wish I could make owasp colors work without state :(
    this.state = {
      pwStrengthColor: 'grey'
    };
    // this.state = {
    //   username: '',
    //   password: '',
    //   confirmPassword: '',
    //   pwStrength: 0,
    //   pwStrengthColor: 'grey',
    //   pwStrengthPhrase: 'password strength'
    // };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEnterPassword = this.onEnterPassword.bind(this);
    this.onEnterConfirm = this.onEnterConfirm.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    // this.onEnterPassword = this.onEnterPassword.bind(this);
  }
  onSignUp() {
    console.log('Signing up!');
    let user = store.getState().user.user;
    if (user.password !== user.confirm) {
      this.props.setUserPwError(true);
      // this.setState({
      //   confirmPasswordError: true,
      //   passwordError: true,
      //   nonMatchingPasswords: true
      // });
    } else {
      this.props.onSignUp(user.username, user.password);
    }
    // console.log(store.getState().user);
    // console.log(store.getState().user.user.username);
    // console.log(store.getState().user.user.password);
    // console.log(this.props.user.username);
    // console.log(this.props.user.password);
  }

  onUsernameChange(e, { value }) {
    console.log('Entering username', value);
    // const name = e.target.name;
    // this.setState({
    //   confirmPasswordError: false,
    //   passwordError: false,
    //   usernameError: false,
    //   [name]: value
    // });
    this.props.setUsernameError(false);
    this.props.setUserPwError(false);
    this.props.setUsername(value);
    // console.log(store.getState().user.user.username);
  }

  onEnterPassword(e, { value }) {
    console.log('Entering password', value);
    var strength = owasp.test(value);
    let color = colors[strength.passedTests.length][0];
    console.log(strength.passedTests);
    let phrase = colors[strength.passedTests.length][1];

    this.props.setUserPwStrength(strength.passedTests.length / 6 * 100);
    // this.props.setUserPwStrengthColor(color);
    this.props.setUserPwStrengthPhrase(phrase);
    this.props.setUserPwError(false);
    this.props.setUsernameError(false);
    this.props.setUserPassword(value);
    // console.log(store.getState().user.user.password);
    this.setState({
      pwStrengthColor: color
    });
    // this.setState({
    //   confirmPasswordError: false,
    //   passwordError: false,
    //   usernameError: false,
    //   password: value,
    //   pwStrength: strength.passedTests.length / 6 * 100,
    //   pwStrengthColor: color,
    //   pwStrengthPhrase: phrase
    // });
  }

  onEnterConfirm(e, { value }) {
    this.props.setUserConfirm(value);
  }

  render() {
    let user = store.getState().user.user;
    return (
      <Card raised centered>
        <Segment padded size='large'>
          <Form error={this.props.error ? true : false} onClick={this.onSignUp}>
            <Header as='h1'>Sign Up</Header>
            <Form.Input 
              label='username' 
              name='username' 
              onChange={this.onUsernameChange} 
              autoComplete='username' 
              placeholder='username'
              error={user.usernameError} 
            />
            <Form.Input 
              type='password' 
              label='password' 
              name='password' 
              // value={this.state.password} 
              onChange={this.onEnterPassword} 
              autoComplete='new-password' 
              placeholder='password'
              // error={this.state.passwordError} 
            />
            <Progress 
              percent={user.pwStrength} 
              color={this.state.pwStrengthColor} 
              size='tiny'
            >
              {user.pwStrengthPhrase}
            </Progress>
            <Form.Input 
              type='password' 
              label='confirm password' 
              name='confirmPassword' 
              // value={this.state.ConfirmPassword} 
              onChange={this.onEnterConfirm} 
              autoComplete='new-password' 
              placeholder='password'
              error={user.pwError} 
            />
            {user.signUpError}
            <Message
              error 
              content={this.props.error}
            />
            <Form.Button primary type='submit' onClick={this.onSignUp}>Sign Up</Form.Button>
          </Form>
        </Segment>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  password: state.user.password
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUsername, setUserPassword, setUserPwStrength, 
    setUserPwStrengthColor, setUserPwStrengthPhrase, 
    setUsernameError, setUserPwError, setUserConfirm, fetchUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;

