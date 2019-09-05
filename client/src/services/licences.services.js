import axios from "axios";
import setAuthHeader from "../utils/auth-header";

export const licenceServices = {
  getAll,
  get,
  update,
  create,
  remove
};

const baseurl = "http://localthost:5000/api/";

async function create(token, data) {
  const requestOptions = {
    method: "POST",
    url: baseurl + `licences`,
    data
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
}

async function getAll(token) {
  const requestOptions = {
    method: "GET",
    url: baseurl + "licences"
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
}

async function get(token, id) {
  const requestOptions = {
    method: "GET",
    url: baseurl + `licences/${id}`
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
}

async function update(token, id) {
  const requestOptions = {
    method: "PUT",
    url: baseurl + `licences/${id}`
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
}

async function remove(token, id) {
  const requestOptions = {
    method: "DELETE",
    url: baseurl + `licences/${id}`
  };
  setAuthHeader(token);
  const res = await axios(requestOptions);
}
