import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
class App extends Component {
  componentDidMount(){
    axios.post("/auth/login", {
      email: "delucathales@gmail.com",
      password: "teste123"
    }).then(ok => {
      axios.get("/todo/")
      .then(ok => {
        axios.post("/todo/delete", ok.data[1])
        .then(ok => axios.get("/todo/").then(ok => console.log(ok)))
        .catch(err => console.log(err));
      
    });
    //axios.get("/auth/logout")
  });
    
  
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
