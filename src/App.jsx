
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shard/AuthLayout/AuthLayout'
import ForgetPass from './modules/Authentcations/ForgetPass/ForgetPass'
import ChangePass from './modules/Authentcations/ChangePass/ChangePass'
import VerifyAccount from './modules/Authentcations/VerifyAccount/VerifyAccount'
import Register from './modules/Authentcations/Register/Register'
import NotFound from './modules/NotFound/NotFound'
import MasterLayout from './modules/Shard/MasterLayout/MasterLayout'
// import Dashboard from './modules/dashboard/dashboard'
import CategoryList from './modules/Categories/CategoryList/CategoryList'
import RecipeData from './modules/Recipes/RecipeData/RecipeData'
import RecipeList from './modules/Recipes/RecipeList/RecipeList'
import Login from './modules/Authentcations/Login/Login'
import CategoryData from './modules/Categories/CategoryData/CategoryData'
import UserList from './modules/Users/UserList'
import { ToastContainer } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/Shard/ProtectRoute/ProtectedRoute'
import { useEffect, useState } from 'react'


function App() {
  const [user, setUser] = useState(null);


  let saveloginData = ()=>{
  let encodeToken=localStorage.getItem('token');
  if (!encodeToken) {
    return; 
  }
    let decodeToken = jwtDecode(encodeToken);
    console.log(decodeToken);
    setUser(decodeToken);

}

useEffect(()=>{
saveloginData()
},[])

  const router = createBrowserRouter([
    {
      path:'',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login saveloginData={saveloginData}/> },
        { path: 'login', element: <Login saveloginData={saveloginData} /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetPass', element: <ForgetPass/> },
        { path: 'changePass', element: <ChangePass /> },
        { path: 'verifyAccount', element: <VerifyAccount /> }
      ]
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><MasterLayout user={user} /></ProtectedRoute>,
      children: [
        { index: true, element: <Dashboard/> }, 
        { path: 'CategoryList', element: <CategoryList /> },
        { path: 'CategoryData', element: <CategoryData /> },
        { path: 'RecipeData/newRecipe', element: <RecipeData /> },
        { path: 'Recipe/:recipeId', element: <RecipeData /> },
        { path: 'RecipeList', element: <RecipeList /> },
        { path: 'users', element: <UserList /> }
      ]
    },
    {
      path: '*',  
      element: <NotFound />
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} ></RouterProvider>
    </>
  
  )
  
}

export default App
