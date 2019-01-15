import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import '../css/CreateButton.css';

import {
  ReactComponent as Add
} from '../plus.svg';

const message = (auth) => {
  const container = document.getElementsByClassName("new-list")[0];
  
  if(auth) {

    if(container){
      container.classList.add("clickable");
    }

    return <h4>Click here to create a new list</h4>

  } else {
    if(container){
      container.classList.remove("clickable")
    }
    return (
      <div>
        <h4>To create more lists and save them please</h4>
        <Link to="/login" className="redirect">Login</Link>
        <h4>or</h4>
        <Link to="/signup" className="redirect">Sign Up</Link>
      </div>
    );
  }
}

const addClick = (props) => {
  if(props.user){
    props.createList()
    .then(ok => {
      props.fetchLists();
    });
  }
}

const CreateButton = (props) => {
  return(
    <div className="card new-list" onClick= {() => addClick(props) }>
      <Add className="new"/>
      { message(props.user) }
    </div>
  );
}

const mapStateToProps = ({ auth, list }) => {
  return({ user: auth, list: list });
}

export default connect(mapStateToProps, actions)(CreateButton);
