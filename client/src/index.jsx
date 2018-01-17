import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import { Provider } from 'react-redux';
import store from './js/store.js';
import './styles/styles.css';
// import { setUsername, setUserPassword, fetchUser } from '../js/actions/userActions';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

console.log('Rendering Main Page');

ReactDOM.render((
<Provider store={store}>
  <Router>
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route path='/' component={App}/>
    </Switch>
  </Router>
</Provider>), document.getElementById('app'));
