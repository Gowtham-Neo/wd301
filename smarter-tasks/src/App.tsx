import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";
import { MembersProvider } from "./context/members/context";
import { CommentProvider } from "./context/comment/context";
import { TasksProvider } from "././context/task/context";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-screen w-full mx-auto py-2 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <ProjectsProvider>
        <MembersProvider>
          <TasksProvider>
            <CommentProvider>
              <RouterProvider router={router} />
            </CommentProvider>
          </TasksProvider>
        </MembersProvider>
      </ProjectsProvider>
    </div>
  );
};
export default App;
