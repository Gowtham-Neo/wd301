import ProjectList from "./ProjectList";
import NewProject from "./NewProject";
const Projects = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight">Projects</h2>
        <NewProject />
      </div>
      <ProjectList />
    </>
  )
}
export default Projects;