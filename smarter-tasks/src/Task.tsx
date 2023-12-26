import "./TaskCard.css";
import { TaskItem } from "./types";

interface TaskProps {
  task: TaskItem;
  onDelete: () => void;
}

const Task = (props: TaskProps) => {
  return (
    <div className="border shadow-md TaskItem border-slate-100">
      <h2 className="my-1 text-base font-bold">{props.task.title}</h2>
      <p className="text-sm text-slate-500">Date: {props.task.dueDate}</p>
      <p className="text-sm text-slate-500">Description: {props.task.description}</p>
    </div>
  );
};

export default Task;
