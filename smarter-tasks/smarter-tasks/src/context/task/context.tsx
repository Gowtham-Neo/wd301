import React, { createContext, useContext, useReducer } from "react";
import { taskReducer, initialState } from "./reducer";
import { TaskListState, TasksDispatch } from "./types";
const TasksStateContext = createContext<TaskListState>(initialState);
const TasksDispatchContext = createContext<TasksDispatch>(() => {});
export const TasksProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TasksStateContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
export const useTasksState = () => useContext(TasksStateContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext);