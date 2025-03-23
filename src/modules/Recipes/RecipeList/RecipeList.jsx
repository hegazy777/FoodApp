import React, { useEffect, useState } from "react";
import Header from "../../Shard/Header/Header";
import axios from "axios";
import noDataImage from "../../../assets/noCatory.png";
import { axiosinstance, BaseUrl, recipeUrl } from "../../Urls/Urls";
import { Link, useNavigate } from "react-router-dom";

export default function RecipeList() {
  const [RecipeData, setRecipeData] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [tages, setTages] = useState([]);
  const [name, setName] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // const navigate = useNavigate();
  // const handleEdit = (recipeId) => {
  //   navigate(`RecipeData/${recipeId}`);
  // };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=6&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("caccc", response);
      setCategories(response.data.data);
    } catch (error) { }
  };

  const fetchTages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("tage", response);
      setTages(response.data);
    } catch (error) { }
  };

  const fetchRecipe = async (pageNumber, pageSize, name, tag, cat) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(`${BaseUrl}/Recipe/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          name: name,
          tagId: tag,
          categoryId: cat,
        },
      });
      console.log("data", response);
      setRecipeData(response.data.data);
      //  setTotalPage(response.data.totalNumberOfPages)
      setTotalPage(
        [...Array(response.data.totalNumberOfPages).keys()].map((i) => i + 1)
      );
      console.log("pages", response.data.totalNumberOfPages);
      setLoading(false);
    } catch (error) { }
  };

  const deleteRecipe = async (recipeId) => {
    alert(recipeId);
    try {
      const response = await axiosinstance.delete(
        recipeUrl.DeleteRecipe(recipeId)
      );
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this recipe?"
      );
      if (!confirmDelete) return;

      if (response.status === 200) {
        alert("Recipe deleted successfully!");
        fetchRecipe();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete the recipe");
    }
  };

  const getName = (e) => {
    setName(e.target.value);
    fetchRecipe(totalPage, 5, name, selectedTag, selectedCategory);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
    fetchRecipe(totalPage, 5, name, selectedTag, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    fetchRecipe(totalPage, 5, name, selectedTag, selectedCategory);
  };

  useEffect(() => {
    fetchRecipe(totalPage, 5, name, selectedTag, selectedCategory);
    fetchCategories();
    fetchTages();
  }, [currentPage, name, selectedTag, selectedCategory]);

  return (
    <>
      <Header
        title={"Recipe List"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="title">
            <h1 className="m-0 fw-bold">Recipe Table Details</h1>
            <p className="text-muted">You can check all details</p>
          </div>
          <div className="addCategory">
            {/* <button className="btn btn-success">
              <i className="fa fa-plus"></i> Add Recipe
            </button> */}
            <Link
              to="/dashboard/RecipeData/newRecipe"
              className="btn btn-success"
            >
              Add Recipe
            </Link>
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

          <div className="col-md-3">
            <select
              className="form-select"
              onChange={handleTagChange}
              value={selectedTag}
            >
              <option value="">Tags</option>
              {tages.map((tag, index) => (
                <option value={tag.id} key={index}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">Category</option>
              {categories.map((cat, index) => (
                <option value={cat.id} key={index}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading Data...</span>
            </div>
          </div>
        ) : (
          <table className="table">
            <thead className="">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>image</th>
                <th>Price</th>
                <th>tag</th>
                <th>Category</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {RecipeData.length > 0 ? (
                RecipeData.map((Recipe) => (
                  <tr key={Recipe.id}>
                    <td>{Recipe.id}</td>
                    <td>{Recipe.name}</td>
                    <td>
                      <img
                        // src={`https://upskilling-egypt.com:3006/${Recipe.imagePath}`}
                        src={
                          Recipe.imagePath
                            ? `https://upskilling-egypt.com:3006/${Recipe.imagePath}`
                            : `${noDataImage}`
                        }
                        width={80}
                      />
                    </td>
                    <td>{Recipe.price}</td>
                    <td>{Recipe.tag.name}</td>
                    <td>{Recipe.category?.[0]?.name || "No Category"}</td>
                    {/* <td className="d-flex">
                      <button className="btn btn-primary btn-sm me-2">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRecipe(Recipe.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td> */}

                    <td>
                      <div className="dropdown">
                        <i
                          className="fa fa-ellipsis-v text-secondary"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ cursor: "pointer" }}
                        ></i>
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
                            <Link
                              className="dropdown-item"
                              to={`/dashboard/Recipe/${Recipe.id}`}
                            >
                              <i
                                className="fa fa-edit me-2"
                                style={{ color: "#009247" }}
                              ></i>
                              Edit
                            </Link>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => deleteRecipe(Recipe.id)}
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
                  <td colSpan="3" className="text-center">
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
        )}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {/* Previous Button */}
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

            {/* Page Numbers */}
            {totalPage.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => fetchRecipe(page, 5)}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li
              className={`page-item ${currentPage === totalPage.length ? "disabled" : ""
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
