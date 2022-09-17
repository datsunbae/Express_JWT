import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
import { getUsersStart, getUsersSuccess, getUsersFailed } from './userSlice';

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

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try{
        const res = await axios.get("/user", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUsersSuccess(res.data));
    }catch(err){
        dispatch(getUsersFailed());
    }
}