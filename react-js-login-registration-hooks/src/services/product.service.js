import axios from "axios";

const API_URL = "http://localhost:8088/products/";

const getAllProduct = () => {
  return axios.get(API_URL);
};
const ProductService = {
  getAllProduct
}

export default ProductService;
