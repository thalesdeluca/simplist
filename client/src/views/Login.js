import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import close, {
  ReactComponent as Close
} from '../close.svg';
class Login extends React.Component{
  componentDidMount(){
    const container = document.getElementsByClassName("container")[0];
    container.style.animation= "appear 1s ease";
  }

  logIn = () => {
    const email = document.getElementById("email");
    const pass = document.getElementById("password");
    if(email.value){
      let emailValue = email.value;

      const emailValidation = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

      if(!emailValidation.test(emailValue)){
        alert("Email is invalid");
        email.focus();
      } else {
        if(pass.value){
          this.props.loginUser(emailValue, pass.value)
          .then(ok => {
            window.location.href = "/";
          });
        } else {
          alert("No password was informed");
          pass.focus();
        }
      }
    }
    
  }

  render(){
    return(
      <div className="container">

        <h4>Log in or Sign up to save your lists </h4>

        <Link to="/" className="closeContainer">
          <Close className="close"/>
        </Link>

        <div>
          <input type="text" id= "email" placeholder="Email"/>
          <input type="password" id="password" placeholder="Password"/>
        </div>

        <a href="#">Forgot password?</a>

        <div className="button" onClick={this.logIn}>
          LOGIN
        </div>

        <p>If you don't have an account just</p>

        <Link to="/signup" className="link button sign">Sign Up</Link>
        

      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return({ auth });
}

export default connect(mapStateToProps, actions)(Login);