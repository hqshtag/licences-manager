import axios from "axios";
//import { authHeader } from "../utils";

export const userService = {
  login,
  logout
};

async function login(username, password) {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:5000/api/login",
    data: {
      username,
      password
    }
  };
  const res = await axios(requestOptions);
  localStorage.setItem("jwt-token", res.data["auth-token"]);
}

function logout() {
  localStorage.removeItem("jwt-token");
}
