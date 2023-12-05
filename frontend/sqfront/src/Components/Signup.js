import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const [isSignUpsuccessfull, setIsSignUpSuccessfull] = useState(false);
  const [isSignUpFail, setIsSignUpFail] = useState(false);

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  };

  const signup = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = userInfo;
    if (password) {
      if (password === password2) {
        axios
          .post(
            "http://localhost:4000/api/v1/register",
            {
              name: name,
              email: email,
              password: password,
            },
            { mode: "cors" },
            { withCredentials: true }
          )
          .then(() => {
            setIsSignUpSuccessfull(true);
            setIsSignUpFail(false);
          })
          .catch(() => {
            setIsSignUpSuccessfull(false);
            setIsSignUpFail(true);
          });
      } else {
        setIsSignUpSuccessfull(false);
        setIsSignUpFail(true);
      }
    }
  };

  return (
    <div>
      {isSignUpsuccessfull && (
        <div className="alert alert-success" role="alert">
          SignUp Successful
        </div>
      )}

      {isSignUpFail && (
        <div className="alert alert-danger" role="alert">
          SignUp Failed
        </div>
      )}

      <form onSubmit={signup}>
        <h1> SignUp</h1>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            onChange={handleChange}
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChange}
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
            name="password"
            onChange={handleChange}
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            onChange={handleChange}
            id="exampleInputPassword2"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;