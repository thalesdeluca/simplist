import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const CreateButton = () => {
  message = () =>{
    if(this.props.auth){
      return <h4>Click here to create a new list</h4>
    } else {
      return (
        <div>
          <h4>To create more lists and save them please</h4>
          <Link to="/login">Login</Link>
          <h4>or</h4>
          <Link to="/signup">Sign Up</Link>
        </div>
      );
    }
  }
  return(
    <div className="new-list">
      {/*svg plus icon*/}
      { this.message }
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return({ auth });
}

export default connect(mapStateToProps, actions)(CreateButton);
