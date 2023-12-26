import React from "react";
import { TaskItem } from "./types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { uselocalStorage } from "./hooks/useLocalStorage";

interface TaskAppState {
  tasks: TaskItem[];
}
const TaskApp = () => {
  const [taskAppState, setTaskAppState] = uselocalStorage<TaskAppState>("tasks", {
    tasks: [],
  });

  React.useEffect(() => {
    const id = setTimeout(() => {
      console.log(`Saved ${taskAppState.tasks.length} items to backend...`);
    }, 5000);
    return () => {
      console.log("clear or cancel any existing network call");
      clearTimeout(id);
    };
  }, [taskAppState.tasks]);
  const addTask = (task: TaskItem) => {
    setTaskAppState({ tasks: [...taskAppState.tasks, task] });
  };

  const deleteTasks = (index: number) => {
    setTaskAppState((prevState) => {
      const updatedTasks = prevState.tasks.filter((_, i) => i !== index);
      return { tasks: updatedTasks };
    });
  };
  

  return (
    <div className="container py-10 mx-auto max-w-7xl">
      <h1 className="mb-2 text-3xl font-bold text-slate-700">
        Smarter Tasks
      </h1>
      <h1 className="mb-6 text-lg text-slate-600">
        <span className="font-bold">Project: </span>
        Graduation Final Year Project (Revamp college website)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-slate-200 rounded-xl">
          <h1 className="mb-2 text-xl font-bold text-center text-slate-500">
            Pending
          </h1>
          <TaskForm addTask={addTask} />
          <TaskList tasks={taskAppState.tasks} deleteTask={deleteTasks} />
        </div>
      </div>
    </div>
  );
};
export default TaskApp;