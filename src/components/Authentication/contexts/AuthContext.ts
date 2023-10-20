import { Dispatch } from "react";
import { AuthAction, User } from "../reducers/authReducer";
import React from "react";

interface AuthContextType{
    user: User;
    dispatch: Dispatch<AuthAction>
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export default AuthContext