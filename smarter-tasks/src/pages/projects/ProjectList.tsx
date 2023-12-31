import { fetchProjects } from "../../context/projects/actions";
import { useEffect } from "react";
import { useProjectsDispatch } from "../../context/projects/context";
import ProjectListItems from './ProjectListItems';
const ProjectList: React.FC = () => {

  const dispatchProjects = useProjectsDispatch();
  
  useEffect(() => {
    fetchProjects(dispatchProjects)
  }, [])
  return (
    <div className="grid grid-cols-4 gap-4 mt-5">
      <ProjectListItems />
    </div>
  );
};
export default ProjectList;