import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useCookies } from "react-cookie";
import "./Navbar.css";
import logo from "../Image/favicon.ico";

function Navbar() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logout = () => {
    dispatch(authActions.logout());
    removeCookie("token");
    removeCookie("email");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid navbar-style">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="nav-link active" aria-current="page">
          <img src={logo} height={50} width={50} alt="logo" className="pb-1" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>

            <li className="nav-item">
              {isLoggedIn && (
                <Link to="/dm" className="nav-link" href="#">
                  Message
                </Link>
              )}
            </li>
          </ul>
          <Link to="/profile">
            {isLoggedIn && (
              <button className="btn btn-outline-success" type="submit">
                Edit Profile
              </button>
            )}
          </Link>
          <Link to="/login">
            {isLoggedIn && (
              <button className="btn btn-outline-success" onClick={logout}>
                Logout
              </button>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
