import axios from "axios";

export const apiServices = {
  getAllLicences,
  getLicence,
  updateLicence,
  createLicence,
  removeLicence,
  login,
  logout,
  verifyToken
};

const baseurl = "http://localhost:5000/api/";

async function createLicence(token, data) {
  const requestOptions = {
    method: "POST",
    url: baseurl + `licences`,
    data
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

async function getAllLicences(token) {
  const requestOptions = {
    method: "GET",
    url: baseurl + "licences"
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data.licences;
}

async function getLicence(token, id) {
  const requestOptions = {
    method: "GET",
    url: baseurl + `licences/${id}`
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

async function updateLicence(token, id, data) {
  const requestOptions = {
    method: "PUT",
    url: baseurl + `licences/${id}`,
    data
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data.result;
}

async function removeLicence(token, id) {
  const requestOptions = {
    method: "DELETE",
    url: baseurl + `licences/${id}`
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
  return res.data;
}

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

  return res;
}

function logout() {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
}

async function verifyToken(token) {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:5000/api/__verify_me",
    data: {
      token: token
    }
  };

  const res = await axios(requestOptions);
  return res;
}

function setAuthHeader(token) {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
}
