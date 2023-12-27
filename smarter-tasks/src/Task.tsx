import "./TaskCard.css";
import { TaskItem } from "./types";

interface TaskProps {
  item: TaskItem;
  removeTask: (task: TaskItem) => void;
}
const Task = (props: TaskProps) => {
  const { item, removeTask } = props;
  return (
    <div className="border shadow-md TaskItem border-slate-100">
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div>
          <a href={`/tasks/${item.id}`}>
            <h2 className="my-1 text-base font-bold">{item.title}</h2>
          </a>
          <p className="text-sm text-slate-500">{item.dueDate}</p>
          <p className="text-sm text-slate-500">
            Description: {item.description}
          </p>
        </div>

        <button className="flex items-center justify-center w-4 h-4 my-5 mr-5 rounded-full cursor-pointer deleteTaskButton"
          onClick={() => removeTask(item)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Task;