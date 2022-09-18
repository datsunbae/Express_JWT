import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAxiosJWT } from "../../constants/axiosJWT";
import { logoutUser } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import "./navbar.css";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxiosJWT(user, dispatch, logoutSuccess);

  const handleLogoutUser = () => {
    const accessToken = user?.accessToken;
    const idUser = user?._id;
    logoutUser(accessToken, idUser, dispatch, navigate, axiosJWT);
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        Home{" "}
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.username} </span>{" "}
          </p>
          <Link to="/logout" className="navbar-logout" onClick={handleLogoutUser}>
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            {" "}
            Login{" "}
          </Link>
          <Link to="/register" className="navbar-register">
            {" "}
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
