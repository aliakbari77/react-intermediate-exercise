import React, { ReactNode, useContext, useReducer } from "react";
import TasksContext from "../contexts/TasksContext";
import taskReducer from "../reducers/taskReducer";

interface Props {
  children: ReactNode;
}

const TasksProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
