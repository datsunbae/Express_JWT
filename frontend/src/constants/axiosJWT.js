
import axios from "axios";
import jwt_decode from "jwt-decode";


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

export const createAxiosJWT = (user, dispatch, stateSuccess) => {
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
          let date = new Date();
          const decodeAccessToken = jwt_decode(user?.accessToken);
          if (decodeAccessToken.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = {
              ...user,
              accessToken: data.newAccessToken,
            };
            dispatch(stateSuccess(refreshUser));
            //Change headers token
            config.headers["token"] = "Bearer" + data.newAccessToken;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

      return axiosJWT;
}