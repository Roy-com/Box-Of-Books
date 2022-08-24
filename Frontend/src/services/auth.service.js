import api from "./api";
import TokenService from "./token.service";

// import axios from "axios";

// const API_URL = "/auth";

const signup =  async(name,email, password,repassword) => {
  return await api
    .post("/users/signup", {
      name,
      email,
      password,
      repassword,
    })
    .then((response) => {
      if (response.data.accesstoken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        console.log("token is set")
        TokenService.setUser(response.data);
      }

      return response;
    });
};

const login = async(email, password) => {
  return await api
    .post("/users/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data.accesstoken)
      if (response.data.accesstoken) {
        console.log(response.data)
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
        
      }
   console.log(localStorage.getItem("token"))
      return response;
    });
};

const logout = () => {
  // localStorage.removeItem("user");
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;