import React from 'react';
import { Segment, Button, Divider, Message, Menu, Form, Progress, Header, Container, Card, Grid } from 'semantic-ui-react';
import owasp from 'owasp-password-strength-test';
import { connect } from 'react-redux';
import { 
  setUsername, setUserPassword, setUserPwStrength, 
  setUserPwStrengthColor, setUserPwStrengthPhrase, 
  setUsernameError, setUserPwError, setUserConfirm,
  setSignUpError
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
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEnterPassword = this.onEnterPassword.bind(this);
    this.onEnterConfirm = this.onEnterConfirm.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    console.log('Signing up!');
    let user = store.getState().user.user;
    if (user.password !== user.confirm) {
      this.props.setUserPwError(true);
      this.props.setSignUpError('Passwords don\'t match, please try again');
    } else {
      this.props.onSignUp(user.username, user.password);
    }
  }

  onUsernameChange(e, { value }) {
    // console.log('Entering username', value);
    this.props.setUsernameError(false);
    this.props.setUserPwError(false);
    this.props.setUsername(value);
  }

  onEnterPassword(e, { value }) {
    var strength = owasp.test(value);
    let color = colors[strength.passedTests.length][0];
    console.log(strength.passedTests);
    let phrase = colors[strength.passedTests.length][1];
    
    this.props.setUserPwStrength(strength.passedTests.length / 6 * 100);
    // this.props.setUserPwStrengthColor(color);
    // console.log(store.getState().user.user.pwStrengthColor);
    this.props.setUserPwStrengthPhrase(phrase);
    this.props.setUserPwError(false);
    this.props.setUsernameError(false);
    this.props.setUserPassword(value);

    this.setState({
      pwStrengthColor: color
    });
  }

  onEnterConfirm(e, { value }) {
    this.props.setUserConfirm(value);
  }

  render() {
    let user = store.getState().user.user;
    console.log(user);
    return (
      <Card raised centered>
        <Segment padded size='large'>
          <Form error={user.signUpError ? true : false}>
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
              error={user.pwError} 
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
            {(user.signUpError) ? (
              <Message
                error 
                content={user.signUpError} />
            ) : null}

            <Form.Button primary type='submit' onClick={this.onSignUp}>Sign Up</Form.Button>
          </Form>
        </Segment>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  password: state.user.password,
  confirm: state.user.confirm,
  pwStrength: state.user.pwStrength,
  pwStrengthColor: state.user.pwStrengthColor,
  pwStrengthPhrase: state.user.pwStrengthPhrase,
  usernameError: state.user.usernameError,
  pwError: state.user.pwError,
  signUpError: state.user.signUpError
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    setUsername, setUserPassword, setUserPwStrength, 
    setUserPwStrengthColor, setUserPwStrengthPhrase, setSignUpError,
    setUsernameError, setUserPwError, setUserConfirm }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;

