import { Dispatch } from "react";
import { ActionTask, Task } from "../reducers/taskReducer";
import React from "react";

interface TaskcontextType{
    tasks: Task[];
    dispatch: Dispatch<ActionTask>
}

const TasksContext = React.createContext<TaskcontextType>({} as TaskcontextType)

export default TasksContext