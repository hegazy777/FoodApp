import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { axiosinstance } from "../../Urls/Urls";
import upload from "../../../assets/download.png";
import { toast } from "react-toastify";

export default function RecipeData() {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params.recipeId);
  const recipeId = params.recipeId;

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tages, setTages] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    
    if (data.recipeImage.length > 0) {
      formData.append("recipeImage", data.recipeImage[0]);
    }

    try {
      if (recipeId) {
        // **Update Existing Recipe**
        await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Recipe updated successfully!");
      } else {

        await axios.post(
          "https://upskilling-egypt.com:3006/api/v1/Recipe",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Recipe added successfully!");
      }

      navigate("/dashboard/RecipeList"); 

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error submitting recipe");
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=3",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("caccc", response);
      setCategories(response.data.data);
    } catch (error) {
      console.log("caccc", error);
    }
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
      console.log("tage", response.data);
      setTages(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategories();
    fetchTages();

    if (recipeId && recipeId !== "newRecipe") {
      fetchRecipe(recipeId);
    }
  }, [recipeId]);

  const fetchRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const recipeData = response.data;

      // Populate form fields
      setValue("name", recipeData.name);
      setValue("price", recipeData.price);
      setValue("description", recipeData.description);
      setValue("tagId", recipeData.tag?.id); // Ensure it accesses 'id'

      // Set category IDs (if available)
      if (recipeData.category) {
        setValue(
          "categoriesIds",
          recipeData.category.map((cat) => cat.id)
        );
      }

      // Set image if available
      if (recipeData.imagePath) {
        setImage(`https://upskilling-egypt.com:3006/${recipeData.imagePath}`);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };
  return (
    <>
 
      <div className="w-100 p-4 mb-3" style={{ backgroundColor: "#f0faec" }}>
        <div
          className="container d-flex justify-content-between align-items-center"
          style={{ maxWidth: "800px" }}
        >
          <div>
            <h5 className="fw-bold">
              Fill the <span className="text-success">Recipes</span> !
            </h5>
            <p className="text-muted mb-0">
              You can now fill the meals easily using the table and form,
              <br />
              click here and fill it with the table!
            </p>
          </div>
          <button className="btn btn-success d-flex align-items-center">
            All Recipes <span className="ms-2">→</span>
          </button>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          className="container p-4 bg-white shadow rounded"
          style={{ maxWidth: "800px" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Recipe Name"
                {...register("name", { required: "Recipe name is required" })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <select className="form-select" {...register("tagId")}>
                <option value="">Tags</option>
                {tages.map(({ id, name }) => (
                  <option
                    value={id}
                    key={id}
                    selected={id}
                  >
                    {name}
                  </option>
                ))}
              </select>
              {errors.tagId && (
                <p className="text-danger">{errors.tagId.message}</p>
              )}
            </div>

            <div className="mb-3 d-flex align-items-center">
              <input
                type="number"
                className="form-control"
                placeholder="Price (EGP)"
                {...register("price", { required: "Price is required" })}
              />
              <span className="ms-2">EGP</span>
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                {...register("categoriesIds", {
                  required: "categoriesIds is required",
                })}
              >
                <option value="">Category</option>
                {categories.map(({id, name}) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-danger">{errors.category.message}</p>
              )}
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description *"
                {...register("description", {
                  required: "description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </div>

            <div
              className="p-4  text-center bg-light rounded"
              style={{
                border: "2px dashed #009247",
                borderRadius: "8px",
                backgroundColor: "#f1fff0",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                accept="image/*"
                className="d-none"
                id="fileUpload"
                {...register("recipeImage", {
                  onChange: (event) => {
                    if (event.target.files && event.target.files[0]) {
                      setImage(URL.createObjectURL(event.target.files[0]));
                    }
                  },
                })}
              />
              <img src={upload} alt="" />
              <label htmlFor="fileUpload" className="d-block">
                Drag & Drop or{" "}
                <span className="text-success">Choose an Item Image</span> to
                Upload
              </label>
              {/* {errors.recipeImage && (
                <p className="text-danger">{errors.recipeImage.message}</p>
              )} */}
              {image && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="img-fluid rounded"
                    style={{width:300}}
                    
                  />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => {
                      setImage(null);
                      // Reset the image field in the form
                      setValue("recipeImage", null);
                    }}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end mt-3">
              {/* <button type="button" className="btn btn-secondary me-2">
                Cancel
              </button> */}
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
