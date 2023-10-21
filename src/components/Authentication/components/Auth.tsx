import React, { useContext, useReducer, useRef } from "react";
import authReducer from "../reducers/authReducer";
import AuthContext from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { user, dispatch } = useAuth();

  if (!user.userName)
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (userNameRef.current && passwordRef.current) {
            const user = {
              userName: userNameRef.current.value,
              password: passwordRef.current.value,
            };
            console.log(user);
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

  if (user.userName)
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5>User: {user.userName}</h5>
          <button
            className="btn btn-outline-danger"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Logout
          </button>
        </div>
      </>
    );
};

export default Login;
