import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Landing from './components/Landing';
import Home from './components/Home';
import Profile from './components/Profile';
import PostForm from './components/post/PostForm';
import Post from './components/post/Post';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/:id" component={Home} />
              <Route exact path="/:id/profile" component={Profile} />
              <Route exact path="/:id/postform" component={PostForm} />
              <Route exact path="/:id/post/:id" component={Post} />
            </div>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
