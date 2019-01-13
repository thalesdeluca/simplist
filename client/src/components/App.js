import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Dashboard from '../views/Dashboard';

class App extends React.Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Dashboard}/>
          </div>  
        </BrowserRouter>
      </div>
    );
  }
}

export default App;