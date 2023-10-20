export interface User{
    userName: string;
    password: string;
}

interface LoginAction{
    type: "LOGIN";
    user: User
}

interface LogoutAction{
    type: "LOGOUT";
}

export type AuthAction = LoginAction | LogoutAction

const authReducer = (user: User, action: AuthAction): User => {
    if (action.type === "LOGIN"){
        return {userName: action.user.userName, password: action.user.password}  
    } 
    if (action.type === "LOGOUT") return {userName: "", password: ""}
    return user
}

export default authReducer