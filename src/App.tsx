import "./App.css";
import Login from "./components/Authentication/components/Auth";
import AuthProvider from "./components/Authentication/components/AuthProvider";
import Home from "./components/Authentication/components/Home";
import TasksProvider from "./components/Authentication/components/TasksProvider";

function App() {
  return (
    <TasksProvider>
      <AuthProvider>
        <Login />
        <Home />
      </AuthProvider>
    </TasksProvider>
  );
}

export default App;
