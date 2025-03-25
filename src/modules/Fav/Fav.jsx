import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../Urls/Urls";
import { FaHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import noDataImage from "../../assets/noCatory.png";

export default function Fav() {
  const [favRecipeData, setFavRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFav = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BaseUrl}/userRecipe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("faaav", response.data.data);
      setFavRecipeData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      setLoading(false);
    }
  };
  const deleteFav = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BaseUrl}/userRecipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Recipe removed from favorites!", { position: "top-right" });
      fetchFav();
    } catch (error) {
      console.error("Error deleting favorite recipe:", error);
    }
  };
  useEffect(() => {
    fetchFav();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Favorite Recipes</h2>
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : favRecipeData?.length > 0 ? (
          favRecipeData.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card shadow-sm border-0 rounded">
                <div className="position-relative">
                  <img
                    src={recipe.recipe.imagePath
                      ? `https://upskilling-egypt.com:3006/${recipe.recipe.imagePath}`
                      : "https://via.placeholder.com/200"}
                    className="card-img-top"
                    style={{ height: "200px", width: "40", objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute top-0 end-0 p-2"
                    style={{ background: "white", borderRadius: "50%" }}
                  >
                    <FaHeart className="text-danger" />
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{recipe.recipe.name}</h5>
                  <p className="card-text text-muted">
                    {recipe.recipe.description}
                  </p>
                  <Button variant="danger" onClick={() => deleteFav(recipe.id)}>
                    Remove from Favorites
                  </Button>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  );
}
