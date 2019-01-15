import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../css/App.css';
import Header from './Header';
import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Signup from '../views/Signup';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return(
      <div> 
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
          </div>  
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);