import axios from "axios";

const API_URL = "http://localhost:8088/category/";

const getAllCat = () => {
  const jsonObject = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${jsonObject.token}`
    }
  }); 
  // return axios.get(API_URL + "admin")  ss;
};
const CategoryService = {
  getAllCat
}

export default CategoryService;
