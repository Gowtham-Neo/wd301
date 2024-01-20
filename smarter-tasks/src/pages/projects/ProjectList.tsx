import React from "react";
import ProjectListItems from "./ProjectListItems";

const ProjectList: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-5">
      <ProjectListItems />
    </div>
  );
};

export default ProjectList;