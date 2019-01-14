import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps ({ auth, list }){ 
  return { auth, list };
}

export default connect(mapStateToProps, actions)(Dashboard);