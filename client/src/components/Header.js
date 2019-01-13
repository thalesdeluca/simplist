import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Header.css'

class Header extends React.Component {
  logIn = () => {
    
    if(this.props.auth){
      this.props.logoutUser();
    } else {
      this.props.loginUser("delucathales@gmail.com", "teste123");
    }
    
  }

  renderContent() {
    if(this.props.auth){
      return(
        <Link to="/login" id="user" className="link">
        { this.props.auth.name }
        </Link>
      );
    } else {
      return(
        <Link to="/login" id="user" className="link">
            Login
        </Link>
      );
    }
  }
  
  render() {
    return( 
      <div className="nav">
        <Link to="/" className="link">SimpList</Link>
        { this.renderContent() }
      </div>
      
    );
  }
}
function mapStateToProps ({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Header);