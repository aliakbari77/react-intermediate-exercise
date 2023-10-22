import { useContext, useReducer } from "react";
import useAddUser from "./hooks/useAddUser";
import useUsers from "./hooks/useUsers";
import usersReducer from "./reducers/usersReducer";
import UsersContext from "./contexts/UsersContext";

const UserList = () => {
	const { users, error } = useContext(UsersContext);
	const addUser = useAddUser();

	if (error) return <h4>{error.message}</h4>;

	return (
		<>
			<div className="d-flex justify-content-between my-3">
				<h1>User List</h1>
				<button
					className="btn btn-primary"
					onClick={() => {
						addUser.mutate({
							id: Date.now(),
							name: "User " + Date.now(),
						});
					}}
				>
					Add User
				</button>
			</div>
			<ul className="list-group">
				{users?.map((user) => (
					<li
						key={user.id}
						className="list-group-item d-flex justify-content-between"
					>
						<span>{user.name}</span>
					</li>
				))}
			</ul>
		</>
	);
};

export default UserList;
