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
            item={task}
            removeTask={() => handleDeleteTasks(idx)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
