import React from 'react';
import Task from './Task';
import * as actions from '../actions';
import{ connect } from 'react-redux';
import '../css/Card.css'

class Card extends React.Component {

  renderTasks = (tasks) => {
    if(tasks){
      const list = tasks.map((task) => 
        <Task 
          key={task._id} 
          checked={task.checked} 
          message={task.message}/>
      );
      return list;
    }
  }

  render(){
    const { title, tasks } = this.props.list;
    
    return(
      <div className="card">
        <div className="card-header">

          <div className="save ">SAVE</div>
          <input type="text" placeholder= { title }/>
          <div className="add">Add</div>

        </div>

        <div className="task-list">
          { this.renderTasks(tasks) }
        </div>

        <div className="delete"></div>
      </div>
    );
  }
}

export default connect(null, actions)(Card);