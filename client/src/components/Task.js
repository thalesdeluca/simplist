import React from 'react';
import '../css/Task.css'
import {
  ReactComponent as Trash
} from '../garbage.svg';
import ReactDOM from 'react-dom';

class Task extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      checkInput: this.props.task.checked,
      messageInput: this.props.task.message,
    }
  }
  

  handleCheck = (e) => {
    this.setState({ checkInput: e.target.checked },() => {
      let task = {
        _id: this.props.task._id,
        checked: this.state.checkInput,
        message: this.state.messageInput 
      };
      this.props.taskChanges(task);
    });
    
  }

  handleMessage = (e) => {
    this.setState({ messageInput: e.target.value }, () => {
      let task = {
        _id: this.props.task._id,
        checked: this.state.checkInput,
        message: this.state.messageInput 
      };
      this.props.taskChanges(task);
    });
  }

  render(){
    return(
      <div className="task">
        <input 
          type="checkbox" 
          onChange={(e) => this.handleCheck(e)} 
          checked={this.state.checkInput}/>

        <input 
          type="text"
          onChange={(e) => this.handleMessage(e)}
          placeholder="Write a task here"
          value={this.state.messageInput}
        />
        <Trash className="delete-task" onClick={() => this.props.deleteTask(this.props.task._id, ReactDOM.findDOMNode(this))}/>
      </div>
    );
  }
}

export default Task;