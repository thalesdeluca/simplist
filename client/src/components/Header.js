import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Header.css'
import axios from 'axios';

class Header extends React.Component {
  showMenu = () => {
    const menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "initial";
  }

  closeMenu = () => {
    const menu = document.getElementsByClassName("menu")[0];
    menu.style.display = "none";
  }

  logOut = () => {
    this.props.logoutUser();
  }
  
  renderContent() {
    if(this.props.auth){
      return(
        <div id="user" onMouseOver= { this.showMenu } 
        onMouseOut = {
          this.closeMenu
        }
        className="link">
          { this.props.auth.name }
          <div className="menu">
            <ul>
              <li onClick={ this.logOut }>Logout</li>
            </ul>
          </div>
        </div>
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