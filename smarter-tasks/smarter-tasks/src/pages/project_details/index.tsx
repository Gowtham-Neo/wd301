import React from "react";
import { TasksProvider } from "../../context/task/context";
import ProjectDetails from "./ProjectDetails";

import { Outlet } from "react-router-dom";

const ProjectDetailsIndex: React.FC = () => {
    return (
      <TasksProvider>
        <ProjectDetails />
        <Outlet />
      </TasksProvider>
    );
  };

export default ProjectDetailsIndex;