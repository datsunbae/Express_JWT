import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import "./home.css";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.user.users?.allUsers);
  const messageError = useSelector((state) => state.user?.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if(!user) {
        navigate("/login");
      }
      if(user?.accessToken) {
        getAllUsers(user?.accessToken, dispatch);
      }
  }, []);

  const handleDeleteUser = (id) => {
      deleteUser(user?.accessToken, id, dispatch);
  }
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">{user?.admin ? "Role: Admin" : "Role: Member"}</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDeleteUser(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{messageError}</div>
    </main>
  );
};

export default HomePage;
