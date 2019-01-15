import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from '../components/Card';
import '../css/Dashboard.css';
import CreateButton from '../components/CreateButton';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchLists()
    .catch(err => console.log("not logged in"));
  }
  renderContent() {
    if(this.props.auth){
      if(this.props.list){
        if(this.props.list.constructor.name == "Array"){
          const lists = this.props.list.map(list => 
            <Card key={ list.id } list={ list }/>
          );
          return lists;
        }
      }
    } else {
      //window.localStorage = 
      return <Card list={ { title: "Title", tasks:[] } }/>
    }

  }
  render(){
    return(
      <div className="dashboard">
        { this.renderContent() }
        <CreateButton/>
      </div>
    );
  }
}

function mapStateToProps ({ auth, list }){ 
  return { auth, list };
}

export default connect(mapStateToProps, actions)(Dashboard);