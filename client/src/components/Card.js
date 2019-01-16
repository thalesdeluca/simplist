import React from 'react';
import Task from './Task';
import * as actions from '../actions';
import{ connect } from 'react-redux';
import '../css/Card.css'
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual'

class Card extends React.Component {
  constructor(props){
    super(props);

    let tasks = this.props.list.tasks.map(attr => {
      return({ ...attr });
    });

    this.state = { 
      titleInput: this.props.list.title,
      tasks: tasks,
      saveBtn: "",
      originalList: this.props.list
    }
  }

  componentDidMount() {
    this.setState({
      saveBtn:ReactDOM.findDOMNode(this).getElementsByClassName("save")[0]
    });
  }
  


  handleTitle = (e) => {
    this.setState({ titleInput: e.target.value });
  }
  
  renderTasks = (tasks) => {
    if(tasks){
      const list = tasks.map((task) => 
        <Task 
          id={task._id}
          key={task._id} 
          className="task-node"
          task= {task}
          taskChanges = {this.taskChanges}
          deleteTask = {this.deleteTask}
          />
      );
      return list;
    }
  }
  deleteTask = (taskId, dom) => {
    const index = this.state.tasks.findIndex(attr => attr._id === taskId);
    dom.remove();
    this.state.tasks.splice(index, 1);
    this.checkChanges();
  }

  deleteList = () => {
    const answer = window.confirm("Do your really want to delete this list? You cannot revert this.");

    if(answer){
      this.props.deleteList(this.props.list)
      .then(ok => {
        this.props.fetchLists();
      })
      .catch(err => alert("Couldn't Delete this list"));
    } 
  }

  addTasks = () => {
    this.setState({
      tasks: [...this.state.tasks, {
        _id: this.state.tasks.length, 
        checked: false,
        message: ""
      }]
    })
  }

  saveChanges = () => {
    if(this.state.saveBtn){
      if(!this.state.saveBtn.classList.contains("disabled")){
        if(this.props.auth){
          let list = this.props.list;
          list.title = this.state.titleInput;
          list.tasks = this.state.tasks;
          
          this.props.saveList(list)
          .then(ok => this.props.fetchLists())
          .catch(err => alert("Couldn't save list"));

        } else {
          window.localStorage.setItem("title", this.state.titleInput);
          window.localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
          this.state.saveBtn.classList.add("disabled");
        }
      }
    }
  }

  checkChanges = () => {
    if(this.state.saveBtn){

      if(!isEqual(this.state.titleInput, this.props.list.title) ||
          !isEqual(this.state.tasks, this.props.list.tasks)){
        this.state.saveBtn.classList.remove("disabled");
      } else {
        this.state.saveBtn.classList.add("disabled");
      }
    }
  }
  taskChanges = (task) => {
    if(task) {
      const taskChanged = this.state.tasks.findIndex(attr => attr._id === task._id);
      this.state.tasks[taskChanged] = task;
      this.checkChanges();
    }
  }

  render(){
    this.checkChanges();
    return(
      <div className="card">
        <div className="card-header">

          <div className="save" onClick={() => this.saveChanges()}>SAVE</div>
          <input 
            type="text" 
            placeholder= { "Title" } 
            value = { this.state.titleInput }
            onChange = { (e) => this.handleTitle(e) }/>
          <div className="add" onClick={() => { this.addTasks()}}>Add</div>

        </div>

        <div className="task-list">
          { this.renderTasks(this.state.tasks) }
        </div>

        <div className="delete" onClick={() => this.deleteList()}>Delete</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }){
  return({ auth });
}

export default connect(mapStateToProps, actions)(Card);