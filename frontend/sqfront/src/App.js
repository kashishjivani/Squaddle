import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import LoginSignup from "./Screen/LoginSignup";
import Aboutus from "./Screen/Aboutus";
import Home from "./Screen/Home";
import Footer from "./Components/Footer";
import Profile from "./Screen/Profile";
import Message from "./Screen/Message";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [matchedUsersList, setMatchedUsersList] = useState([]);
  
  return (
    <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home
                    matchedUsersList={matchedUsersList}
                    setMatchedUsersList={setMatchedUsersList}
                  />
                ) : (
                  <LoginSignup />
                )
              }
            />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <LoginSignup />}
            />
            <Route
              path="/dm"
              element={
                isLoggedIn ? (
                  <Message matchedUsersList={matchedUsersList} />
                ) : (
                  <LoginSignup />
                )
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
};

export default App;
