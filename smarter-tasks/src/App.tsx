import './App.css';
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tasks",
    element: <TaskListPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
