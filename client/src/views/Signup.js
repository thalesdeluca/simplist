import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import {
  ReactComponent as Close
} from '../close.svg';
import axios from 'axios';

class Signup extends React.Component{
  componentDidMount(){
    const container = document.getElementsByClassName("container")[0];
    container.style.animation= "appear 1s ease";
  }

  checkEmail = async (email) => {
    let res;
    try{
       res = await axios.post('/auth/validate', {
        email: email
      });
    } catch (err){
      window.alert("Email already registered!");
      res = null;
    }
    finally {
      return res;
    }
  }

  signUp = () => {
    const email = document.getElementById("email");
    const pass = document.getElementById("password");
    const name = document.getElementById("name");
    if(name.value){
      if(email.value){
        const emailValue = email.value;
        const passValue = pass.value;

        const emailValidation = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

        if(!emailValidation.test(emailValue)){
          alert("Email is invalid");
          email.focus();
        } else {
          //See if email already registeredç
          let emailOk = this.checkEmail(emailValue);

          if(emailOk){
            if(passValue){
              axios.post("/auth/signup", {
                username: name.value,
                email: emailValue,
                password: passValue
              })
              .then(signedup => {
                
                this.props.loginUser(emailValue, passValue)
                .then(ok => {
                  window.location.replace("/")
                })
                
              })
            } else {
              alert("No password was informed");
            }
          }
        }
      }
    } else {
      alert("No Name was informed!");
      name.focus();
    }
    
  }

  render(){
    return(
      <div className="container">
        <h2>Sign Up</h2>
        <Link to="/" className="closeContainer">
          <Close className="close"/>
        </Link>

        <div>
          <input type="text" id="name" placeholder="Name"/>
          <input type="text" id= "email" placeholder="Email"/>
          <input type="password" id="password" placeholder="Password"/>
        </div>

        <div className="button" onClick={this.signUp}>
          SIGN UP
        </div>

      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return({ auth });
}

export default connect(mapStateToProps, actions)(Signup);