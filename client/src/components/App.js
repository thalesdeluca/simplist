import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
    .then(user => {
      console.log(user);
    })
    .catch(err => console.log(err));
  }
  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={null}/>
          </div>  
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);