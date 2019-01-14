import React from 'react';
import '../css/Task.css'

const Task = ({ checked, message }) => {
  return(
    <div className="task">
      <input type="checkbox" />
      <input type="text"/>
    </div>
  );
}

export default Task;