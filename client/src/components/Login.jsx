import React from 'react';
import { Segment, Button, Divider, Menu, Form, Header, Container, Card, Grid } from 'semantic-ui-react';
import http from 'axios';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Logo from '../images/logo.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';
import { setSignInError, setSignUpError } from '../js/actions/userActions.js';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

    // this.state = {
    //   signInError: null,
    //   signUpError: null
    // };
  }

  onSignIn(username, password) {
    http.post('/login', {
      username: username,
      password: password
    })

      .then((response) => {
        if (response.status === 200) {
          this.props.history.replace('/');
        }
      })

      .catch((err) => {
        if (err.response.status === 401) {
          this.props.setSignInError('Incorrect username or password entered');
          // this.setState({
          //   signInError: 'Incorrect username or password entered'
          // });
        } else {
          console.log(err);
        }
      });
  }

  onSignUp(username, password) {
    let user = store.getState().user.user;
    http.post('/register', {
      username: username,
      password: password
    })

      .then((response) => {
        if (response.status === 201) {
          this.props.history.replace('/');
        }
        // set
      })

      .catch((err) => {
        if (err.response.status === 409) {
          if (user.pwError) {
            this.props.setSignUpError('Passwords don\'t match, please try again');
          } else {
            this.props.setSignUpError('Username already taken, please choose a different one');
          }
          
          // this.setState({
          //   signUpError: 'username already taken, please choose a different one'
          // });
        } else {
          console.log(err);
        }
      });
  }

  render() {
    let user = store.getState().user.user;
    return (
      <div className='loginpage'>
        <Menu>
          <Menu.Item href='/login' >
            <img className="logo" src={Logo} />
          </Menu.Item>
        </Menu>
        <Container>
          <Grid>
            <Grid.Row height={200}>
            </Grid.Row>
            <Grid.Row columns={5}>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={5}>
                <SignIn 
                  onSignIn={this.onSignIn} 
                  error={user.signInError}
                />
              </Grid.Column>
              <Grid.Column width={1}>
                <Divider vertical>Or</Divider>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={5}>
                <SignUp 
                  onSignUp={this.onSignUp} 
                  error={user.signUpError}
                />
              </Grid.Column>
              <Grid.Column width={2}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signInError: state.user.signInError,
  signUpError: state.user.signUpError
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setSignInError, setSignUpError }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);