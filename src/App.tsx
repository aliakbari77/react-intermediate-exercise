import "./App.css";
import Navbar from "./components/UserList/Navbar";
import UserList from "./components/UserList/UserList";
import UsersProvider from "./components/UserList/UsersProvider";
import UsersContext from "./components/UserList/contexts/UsersContext";
import useUsers from "./components/UserList/hooks/useUsers";

function App() {
	return (
		<UsersProvider>
			<Navbar />
			<UserList />
		</UsersProvider>
	);
}

export default App;
