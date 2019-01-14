import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from '../components/Card';
import '../css/Dashboard.css';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchLists()
    .catch(err => console.log("not logged in"));
    
  }
  renderContent() {
    if(this.props.list){

    } else {

    }

  }
  render(){
    const list = {
      title: "Title",
      tasks: [{
        _id: "165",
        checked: true,
        message:"Seila"
      }]
    }
    return(
      <div className="dashboard">
        <Card list={ list }/>
      </div>
    );
  }
}

function mapStateToProps ({ auth, list }){ 
  return { auth, list };
}

export default connect(mapStateToProps, actions)(Dashboard);