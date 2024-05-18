import React, { useState, useEffect } from "react";
import CategoryService from "../services/category.service";
import './../customCss/AdminDashBoard.css';
import Modal from './Modal';

const AddCategory = () => {
  const [catName, setcatName] = useState("");
  const [catDescription, setcatDescription] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    CategoryService.getAllCat().then(
      (response) => {
        if (Array.isArray(response.data)) {
          setCategoryOptions(response.data);
          console(categoryOptions);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      },
      (error) => {
        console.error("Failed to fetch categories:", error);
      }
    );
  },);

  const validateForm = () => {
    const errors = {};
    if (!catName) errors.catName = "Product name is required";
    if (!catDescription) errors.catDescription = "Product description is required";
    return errors;
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const categoryData = {
      name: catName,
      description: catDescription
    };
    
    CategoryService.saveCategory(categoryData).then(
      (response) => {
        setSuccessMessage("Category added successfully!"); // Set success message
        // Reset form fields
        setcatName("");
        setcatDescription("");
        setErrors({});
        
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

      },
      (error) => {
        console.error("Failed to add product:", error);
      }
    );
  };

  return (
    <div className="container">
       {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header text-white">
              <h2 className="text-center">Add New Category</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="catName">Category Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.catName ? 'is-invalid' : ''}`}
                    id="catName"
                    value={catName}
                    onChange={(e) => setcatName(e.target.value)}
                    required
                  />
                  {errors.catName && <div className="invalid-feedback">{errors.catName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="catDescription">Category Description</label>
                  <textarea
                    className={`form-control ${errors.catDescription ? 'is-invalid' : ''}`}
                    id="catDescription"
                    value={catDescription}
                    onChange={(e) => setcatDescription(e.target.value)}
                    required
                  ></textarea>
                  {errors.catDescription && <div className="invalid-feedback">{errors.catDescription}</div>}
                </div>
               
                <button type="submit" className="btn btn-primary btn-block">
                  Add Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button type="" onClick={openModal} className="btn btn-primary btn-block">
        Add Product - Add form inside later
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="row justify-content-center">
        Add form here later
      </div>
      </Modal>
    </div>
  );
};

export default AddCategory;


