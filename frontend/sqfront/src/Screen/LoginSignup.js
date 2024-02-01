import React, { useState } from "react";
import Login from "../Components/Login";
import SignUp from "../Components/Signup";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <button
              type="button"
              onClick={toggleAuth}
              className={isSignUp ? "btn btn-light m-2" : "btn btn-primary m-2"}
            >
              Login
            </button>
            <button
              type="button"
              onClick={toggleAuth}
              className={isSignUp ? "btn btn-primary" : "btn btn-light"}
            >
              SignUp
            </button>
          </div>
          <div className="col-md-4"></div>
        </div>
        {isSignUp ? <SignUp />: <Login /> }
      </div>
    </div>
  );
};

export default LoginSignup;
