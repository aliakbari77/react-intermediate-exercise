import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import TaskList from "./TaskList";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user, dispatch } = useAuth();

  if (user.userName) return <TaskList />;

  return <h1>No data</h1>;
};

export default Home;
