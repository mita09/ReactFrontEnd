import React, { useState, useEffect } from "react";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service"; // Assuming you have a service for product operations

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    CategoryService.getAllCat().then(
      (response) => {
        if (Array.isArray(response.data)) {
          setCategoryOptions(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      },
      (error) => {
        console.error("Failed to fetch categories:", error);
      }
    );
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!productName) errors.productName = "Product name is required";
    if (!productDescription) errors.productDescription = "Product description is required";
    if (!productPrice) errors.productPrice = "Product price is required";
    if (isNaN(productPrice) || productPrice <= 0) errors.productPrice = "Product price must be a positive number";
    if (!productCategory) errors.productCategory = "Product category is required";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      category: productCategory,
    };
    ProductService.addProduct(newProduct).then(
      (response) => {
        console.log("Product added successfully:", response.data);
        // Reset form fields
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductCategory("");
        setErrors({});
      },
      (error) => {
        console.error("Failed to add product:", error);
      }
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header text-white">
              <h2 className="text-center">Add New Product</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                  {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Product Description</label>
                  <textarea
                    className={`form-control ${errors.productDescription ? 'is-invalid' : ''}`}
                    id="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  ></textarea>
                  {errors.productDescription && <div className="invalid-feedback">{errors.productDescription}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="productPrice">Product Price</label>
                  <input
                    type="number"
                    className={`form-control ${errors.productPrice ? 'is-invalid' : ''}`}
                    id="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                  {errors.productPrice && <div className="invalid-feedback">{errors.productPrice}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="productCategory">Product Category</label>
                  <select
                    className={`form-control ${errors.productCategory ? 'is-invalid' : ''}`}
                    id="productCategory"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Select a category --
                    </option>
                    {categoryOptions.map((category) => (
                      <option key={category.categoryId} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.productCategory && <div className="invalid-feedback">{errors.productCategory}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;




////------------------ Basic code ------------ working
// import React, { useState, useEffect } from "react";
// import UserService from "../services/user.service";
// import CategoryService from "../services/category.service";
// import EventBus from "../common/EventBus";

// const BoardAdmin = () => {
//   const [content, setContent] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");
//   const [categoryOptions, setCategoryOptions] = useState([]);

//   useEffect(() => {
//     UserService.getAdminBoard().then(
//       (response) => {
//         setContent(response.data);
//         console.log(content);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setContent(_content);

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );

//     CategoryService.getAllCat().then(
//       (response) => {
//         if (Array.isArray(response.data)) {
//           setCategoryOptions(response.data);
//         } else {
//           console.error("Expected an array but got:", response.data);
//         }
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setContent(_content);

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }, []);

//   const handleDropdownChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         {/* <h3>{content}</h3> */}
//       </header>
//       <div>
//         {/* <label htmlFor="adminDropdown">Select a category:</label> */}
//         <select
//           id="adminDropdown"
//           value={selectedOption}
//           onChange={handleDropdownChange}
//         >
//           <option value="" disabled> -- Select Category --
//           </option>
//           {categoryOptions.length > 0 ? (
//             categoryOptions.map((option) => (
//               <option key={option.categoryId} value={option.name}>
//                 {option.name}
//               </option>
//             ))
//           ) : (
//             <option value="" disabled>
//               No categories available
//             </option>
//           )}
//         </select>
//         {/* <p>You selected: {selectedOption}</p> */}
//       </div>
//     </div>
//   );
// };

// export default BoardAdmin;