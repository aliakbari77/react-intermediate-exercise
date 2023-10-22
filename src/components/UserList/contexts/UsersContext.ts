import React from "react";
import User from "../User.interface";

interface UsersContextType {
	users: User[] | undefined;
	error: Error | null;
}

const UsersContext = React.createContext<UsersContextType>(
	{} as UsersContextType
);

export default UsersContext;
