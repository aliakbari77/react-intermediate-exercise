import React, { useContext, useReducer } from "react";
import taskReducer from "../reducers/taskReducer";
import TasksContext from "../contexts/TasksContext";
import useTasks from "../hooks/useTasks";

const TaskList = () => {
  const { tasks, dispatch } = useTasks();
  return (
    <>
      <button
        className="btn btn-primary my-4"
        onClick={() => {
          dispatch({
            type: "ADD",
            task: {
              id: Date.now(),
              title: "Title" + Date.now(),
            },
          });
        }}
      >
        Add
      </button>
      <ul className="list-group">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{t.title}</span>
            <button
              className="btn btn-danger"
              onClick={() => dispatch({ type: "DELETE", taskId: t.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
