import React, { ReactNode } from "react";
import UsersContext from "./contexts/UsersContext";
import useUsers from "./hooks/useUsers";

interface Props {
	children: ReactNode;
}

const UsersProvider = ({ children }: Props) => {
	const { data: users, error } = useUsers();

	return (
		<UsersContext.Provider value={{ users, error }}>
			{children}
		</UsersContext.Provider>
	);
};

export default UsersProvider;
