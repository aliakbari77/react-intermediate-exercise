import React, { useContext, useReducer, useRef } from "react";
import authReducer from "../reducers/authReducer";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [user, dispatch] = useReducer(authReducer, {
    userName: "",
    password: "",
  });

  if (user.userName) return <h1>Hello</h1>

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (userNameRef.current && passwordRef.current) {
          const user = {
            userName: userNameRef.current.value,
            password: passwordRef.current.value,
          };
          console.log(user)
          dispatch({ type: "LOGIN", user });
        }
      }}
    >
      <div>
        <label htmlFor="">User Name</label>
        <input ref={userNameRef} type="text" className="form-control" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input ref={passwordRef} type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Login
      </button>
    </form>
  );
};

export default Login;
