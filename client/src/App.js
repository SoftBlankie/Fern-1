import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppNavbar from './components/nav/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Landing from './components/Landing';
import About from './components/About';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import PostForm from './components/post/PostForm';
import Post from './components/post/Post';
import Help from './components/Help';
import Contact from './components/Contact';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount(prevProps) {
    store.dispatch(loadUser());
  };

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className='App'>
            <AppNavbar />
            <div>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/info/about' component={About} />
                <Route exact path='/:name' component={Home} />
                <Route exact path='/:name/profile' component={Profile} />
                <Route exact path='/:name/postform' component={PostForm} />
                <Route exact path='/:name/post/:id' component={Post} />
                <Route exact path='/:name/help' component={Help} />
                <Route exact path='/:name/contact' component={Contact} />
                <Redirect to='/' />
              </Switch>
            </div>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
