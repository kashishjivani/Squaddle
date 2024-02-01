import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    axios
      .post(
        "http://localhost:4000/api/v1/login",
        {
          email: email,
          password: password,
        },
        { mode: "cors" },
        { withCredentials: true }
      )
      .then((res) => {
        setCookie("email", res.data.email);
        setCookie("token", res.data.token);
        setIsLoginSuccessfull(true);
        setIsLoginFail(false);
        dispatch(authActions.login());
        dispatch(authActions.currentloggeduser({ email: email }));
        navigate("/");
      })
      .catch(() => {
        setIsLoginFail(true);
        setIsLoginSuccessfull(false);
      });
  };

  return (
    <div>
      {isLoginSuccessfull && (
        <div className="alert alert-success" role="alert">
          Login Successful
        </div>
      )}

      {isLoginFail && (
        <div className="alert alert-danger" role="alert">
          Login Failed
        </div>
      )}

      <form onSubmit={login} className="container w-50">
        <h1>Login</h1>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange}
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange}
            name="password"
            id="exampleInputPassword1"
          />
        </div>
        <a href="/">Forget Password?</a>
        <br />
        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
