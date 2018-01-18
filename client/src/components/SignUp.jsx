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

// @connect((store) => {
//   return {
//     username: store.user.username,
//     userFetched: store.user.fetched,
//     password: store.user.password
//   }
// })

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

    // this.state = {
    //   username: '',
    //   password: '',
    //   confirmPassword: '',
    //   pwStrength: 0,
    //   pwStrengthColor: 'grey',
    //   pwStrengthPhrase: 'password strength'
    // };

    this.onChange = this.onChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    console.log('Signing up!');
    let user = store.getState().user.user;
    if (user.password !== user.confirm) {
      this.props.setUserPwError(true);
      // this.props.setUsernameError(true);
      this.props.setSignUpError('Passwords don\'t match, please try again');
      // this.setState({
      //   confirmPasswordError: true,
      //   passwordError: true,
      //   nonMatchingPasswords: true
      // });
    } else {
      this.props.onSignUp(user.username, user.password);
    }
  }

  onChange(e, { value }) {
    console.log('Entering username', value);
    // const name = e.target.name;
    // this.setState({
    //   confirmPasswordError: false,
    //   passwordError: false,
    //   usernameError: false,
    //   [name]: value
    // });
    this.props.setUsername(value);
  }

  onEnterPassword(e, { value }) {
    var strength = owasp.test(value);
    let color = colors[strength.passedTests.length][0];
    let phrase = colors[strength.passedTests.length][1];
    
    this.props.setUserPwStrength(strength.passedTests.length / 6 * 100);
    // this.props.setUserPwStrengthColor(color);
    console.log(store.getState().user.user.pwStrengthColor);
    this.props.setUserPwStrengthPhrase(phrase);
    this.props.setUserPwError(false);
    this.props.setUsernameError(false);
    this.props.setUserPassword(value);

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

  render() {
    let user = store.getState().user.user;
    console.log(user);
    return (
      <Card raised centered>
        <Segment padded size='large'>
          <Form error={this.props.error ? true : false}>
            <Header as='h1'>Sign Up</Header>
            <Form.Input 
              label='username' 
              name='username' 
              // value={this.state.username} 
              onChange={this.onChange} 
              autoComplete='username' 
              placeholder='username'
              // error={this.state.usernameError} 
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
            {/* <Progress percent={this.state.pwStrength} color={this.state.pwStrengthColor} size='tiny'>
              {this.state.pwStrengthPhrase}
            </Progress> */}
            {/* <Form.Input 
              type='password' 
              label='confirm password' 
              name='confirmPassword' 
              value={this.state.ConfirmPassword} 
              onChange={this.onChange} 
              autoComplete='new-password' 
              placeholder='password'
              error={user.pwError} 
            />
            <Message
              error 
              content={this.props.error} />
            {/* {(user.signUpError) ? (
              <Message
                error 
                content={user.signUpError} />
            ) : null} */}

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

