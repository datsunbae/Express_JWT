import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
import { getUsersStart, getUsersSuccess, getUsersFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    }catch(error){
        console.log(456)
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try{
        await axios.post("auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    }catch(error){
        dispatch(registerFailed());
    }
    
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get("/user", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUsersSuccess(res.data));
    }catch(err){
        dispatch(getUsersFailed());
    }
}

export const deleteUser = async (accessToken, id, dispatch, axiosJWT) => {
    dispatch(deleteUserStart());
    try{
        const res = await axiosJWT.delete("/user/" + id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });

        dispatch(deleteUserSuccess(res.data));
    }
    catch(err){
        dispatch(deleteUserFailed(err.response?.data));
    }
}

export const logoutUser = async (accessToken, id, dispatch, navigate, axiosJWT) => {
    dispatch(logoutStart());
    try{
        await axiosJWT.post("/auth/logout", id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        }); 
        dispatch(logoutSuccess());
        navigate("/login")
    }catch(err){
        dispatch(logoutFailed());
    }

}