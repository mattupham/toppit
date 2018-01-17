import React from 'react';
import { Segment, Button, Divider, Icon, Message, Menu, Form, Header, Container, Card, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUsername, setUserPassword, fetchUser } from '../js/actions/userActions.js';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   username: '',
    //   password: ''
    // };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    console.log('Signing in!');
    let user = store.getState().user.user;
    this.props.onSignIn(user.username, user.password);
  }

  onUsernameChange(e, { value }) {
    // const name = e.target.name;
    console.log(value);
    // this.setState({
    //   [name]: value
    // });
    this.props.setUsername(value);
  }

  onPasswordChange(e, { value }) {
    // const name = e.target.name;
    console.log(value);
    // this.setState({
    //   [name]: value
    // });
    this.props.setUserPassword(value);
  }

  render() {
    return (
      <Card raised centered>
        <Segment padded size='huge'>
          <Form error={this.props.error ? true : false} onSubmit={this.onSignIn}>
            <Header as='h1'>Sign In</Header>
            <Button className='githublogin' fluid href='/auth/github' color='black'><Icon name='github'/>Sign in with Github</Button>
            <Button className='googlelogin' fluid href='/auth/google' color='google plus' ><Icon name='google'/>Sign in with Google</Button>
            <Form.Input 
              label='username' 
              name='username' 
              // value={this.state.username} 
              onChange={this.onUsernameChange} 
              autoComplete='username' 
              placeholder='username' 
            />
            <Form.Input 
              type='password' 
              label='password' 
              name='password' 
              // value={this.state.password} 
              onChange={this.onPasswordChange} 
              autoComplete='current-password' 
              placeholder='password' />
            <Message
              error
              content={this.props.error}
            />
            <Form.Button primary type='submit'>Sign In</Form.Button>
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
  return bindActionCreators({ setUsername, setUserPassword, fetchUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);