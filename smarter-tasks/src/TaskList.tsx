import React from "react";
import Task from "./Task";
import { TaskItem } from "./types";

interface Props {
  tasks: TaskItem[];
  deleteTask: (index: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, deleteTask }) => {
  const handleDeleteTasks = (index: number) => {
    deleteTask(index);
  };

  return (
    <ul>
      {tasks.map((task, idx) => (
        <li key={idx}>
          <Task
            task={task}
            onDelete={() => handleDeleteTasks(idx)}
          />
          <button
            className="pl-4 pr-4 m-4 bg-red-600 border rounded deleteTaskButton"
            onClick={() => handleDeleteTasks(idx)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
