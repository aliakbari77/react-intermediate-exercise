import React, { useContext } from "react";
import UsersContext from "./contexts/UsersContext";

const Navbar = () => {
	const { users, error } = useContext(UsersContext);

	return <div>{users?.length}</div>;
};

export default Navbar;
