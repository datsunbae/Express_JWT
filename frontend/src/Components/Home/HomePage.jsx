import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";
import "./home.css";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.user.users?.allUsers);
  const messageError = useSelector((state) => state.user?.messages);
  let axiosJWT = axios.create();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUser = (id) => {
    deleteUser(user?.accessToken, id, dispatch, axiosJWT);
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("/auth/refreshtoken", {
        //add cookie
        withCredentials: true,
      });
      console.log("RES DATA: ", res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodeAccessToken = jwt_decode(user?.accessToken);
      if (decodeAccessToken.exp < date.getTime() / 1000) {
        console.log('Timeeee')
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.newAccessToken,
        };
        dispatch(loginSuccess(refreshUser));
        //Change headers token
        config.headers["token"] = "Bearer" + data.newAccessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {user?.admin ? "Role: Admin" : "Role: Member"}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDeleteUser(user._id)}
              >
                {" "}
                Delete{" "}
              </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{messageError}</div>
    </main>
  );
};

export default HomePage;
