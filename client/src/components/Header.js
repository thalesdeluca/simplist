import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Header extends React.Component {
  teste = () =>{
    this.props.fetchUser();
  }

  renderContent() {
    if(this.props.auth){
      return(
        <div onClick = { this.teste }>
          Header { this.props.auth.data.name }
        </div>
      );
    } else {
      return(
        <div onClick = { this.teste }>
          Header
        </div>
      );
    }
  }
  
  render() {
    return(
      <div>
        { this.renderContent() }
      </div>
      
    );
  }
}
function mapStateToProps ({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Header);