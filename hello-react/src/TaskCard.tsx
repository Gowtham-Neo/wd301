import React from 'react'
import './TaskCard.css'

const TaskCard = (props) => {
  return (
    <div className='TaskItem'>
      <h2 className="text-xl font-bold">{props.title}</h2>
      {props.dueDate ? (
        <p>Due on: {props.dueDate}</p>
      ) : (
        <p>Completed on: {props.completedAtDate}</p>
      )}
      <p>Assignee: {props.assigneeName}</p>
    </div>
  );
};

export default TaskCard