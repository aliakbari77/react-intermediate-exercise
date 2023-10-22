import User from "../User.interface";
import useAddUser from "../hooks/useAddUser";

interface AddAction {
	type: "ADD";
	user: User;
}

const usersReducer = (users: User[], action: AddAction): User[] => {
    const addUser = useAddUser();

	if (action.type === "ADD") return [action.user, ...users];
	return users;
};

export default usersReducer;
