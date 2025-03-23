import React, { useEffect, useState } from "react";
import axios from "axios";
import noDataImage from "../../../assets/noCatory.png";
import Header from "../../Shard/Header/Header";
import DeletConfirmation from "../../Shard/DeletConfirmation/DeletConfirmation";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { axiosinstance, CategorypeUrl } from "../../Urls/Urls";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShow(true);
  };

  const handleCloseAdd = () => setShowAdd(false);
  const handleShoweAdd = () => {
    setShowAdd(true);
  };

  const fetchCategories = async (pageNumber, pageSize,name) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name:name
          },
        }
      );
      console.log("data", response);
      setCategories(response.data.data);
      setTotalPage([...Array(response.data.totalNumberOfPages).keys()].map(i => i + 1));
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosinstance.post(
        CategorypeUrl.AddCategory,
        data
      );
      alert("category added ");
      fetchCategories();
      handleCloseAdd();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  const deleteCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.data);
      fetchCategories();
      handleClose();
    } catch (error) {
      
      alert("Error deleting category:", error);
      handleClose();
    }
  };

  const getName =(e)=>{
    setName(e.target.value)
    fetchRecipe(totalPage, 5,name, selectedTag, selectedCategory);  
  }

  useEffect(() => {
    fetchCategories(totalPage,3,name);
  }, [currentPage,name]);

  return (
    <>
      <Header
        title={"Category List"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  {...register("name", {
                    required: "name is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Enter your Category Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}

              <div>
                <button type="submit" className="btn btn-success w-100 my-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-align-center">
          {/* <Button variant="primary btn-success" onClick={AddCategories} >
            add Category
          </Button> */}
        </Modal.Footer>
      </Modal>

      <DeletConfirmation
        show={show}
        handleClose={handleClose}
        deleteFunction={deleteCategory}
        deleteItem={selectedCategoryId}
      />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="title">
            <h1 className="m-0 fw-bold">Categories Table Details</h1>
            <p className="text-muted">You can check all details</p>
          </div>
          <div className="addCategory">
            <button className="btn btn-success" onClick={handleShoweAdd}>
              <i className="fa fa-plus"></i> Add Category
            </button>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
             onChange={getName}
            />
          </div>
          
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead
              className="table-secondary overflow-visible"
              style={{ backgroundColor: "#E2E5EB" }}
            >
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-ellipsis-v text-secondary"></i>
                      <div className="dropdown">
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item">
                              <i
                                className="fa fa-eye me-2"
                                style={{ color: "#009247" }}
                              ></i>
                              View
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item">
                              <i
                                className="fa fa-edit me-2"
                                style={{ color: "#009247" }}
                              ></i>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleShow(category.id)}
                            >
                              <i
                                className="fa fa-trash me-2"
                                style={{ color: "#009247" }}
                              ></i>
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    <img
                      src={noDataImage}
                      alt="No Data"
                      className="img-fluid"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            </li>
            {totalPage.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => fetchCategories(page, 3)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPage.length ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPage.length))
                }
                disabled={currentPage === totalPage.length}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
