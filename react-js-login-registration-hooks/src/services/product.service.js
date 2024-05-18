import axios from "axios";

const API_URL = "http://localhost:8088/products/";

const getAllProduct = () => {
  return axios.get(API_URL);
};
const addProduct = (formData) => {
  const jsonObject = JSON.parse(localStorage.getItem("user"));
  return axios.post(API_URL + 'saveproductwithimage', formData, {
    headers: {
      'Authorization': `Bearer ${jsonObject.token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  // return axios.get(API_URsL + "admin");
};
const ProductService = {
  getAllProduct,
  addProduct
}

export default ProductService;
