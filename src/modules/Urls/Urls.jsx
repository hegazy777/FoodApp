import axios from "axios";

export const BaseUrl = "https://upskilling-egypt.com:3006/api/v1";
const token = localStorage.getItem("token");
export const axiosinstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const UserUrls = {
  Login: `/Users/Login`,
  Register: `/Users/Register `,
  ForgetPassword: `/Users/Reset/Request`,
  ResetPassword: `/Users/Reset`,
  GetUser: (id) => `/Users/${id}`,
};

export const recipeUrl = {
    DeleteRecipe:(recipeId)=> `/Recipe/${recipeId}`,
   AddRecipe: `/Recipe`,
    
  };

  export const CategorypeUrl = {
    AddCategory:`/Category`,
    UpdateCategory:`/Category`,
    
  };
