import axios from "axios";

const API_URL = "http://localhost:8088/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  const jsonObject = JSON.parse(localStorage.getItem("user"));
  alert("Token : "+jsonObject.token);
  return axios.post(API_URL + 'admin', {}, {
    headers: {
      'Authorization': `Bearer ${jsonObject.token}`
    }
  });
  // return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService;
