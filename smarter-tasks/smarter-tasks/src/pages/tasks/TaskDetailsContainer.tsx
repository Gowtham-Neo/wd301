import { useProjectsState } from "../../context/projects/context";
import { useTasksState } from "../../context/task/context";
import TaskDetails from "./TaskDetails";
import { useParams } from "react-router-dom";

const TaskDetailsContainer = () => {
  let { taskID } = useParams();
  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const isFetchingTasks = taskListState.isLoading;
  const selectedTask = taskListState.projectData.tasks?.[taskID || ""];
  if (isFetchingTasks || !projectState || projectState?.isLoading) {
 return <>Loading...</>;
  }
  if (!selectedTask) {
    return <>No such task!</>;
  }

  return <TaskDetails />;
};

export default TaskDetailsContainer;