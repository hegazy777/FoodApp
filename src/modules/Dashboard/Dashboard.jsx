import React from 'react'
import Header from '../Shard/Header/Header'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Dashboard() {
  return (
    <>
      <Header title={'Welcome Upskilling !'} description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>
      <div className="container mt-4">
      <div className="p-4 rounded d-flex justify-content-between align-items-center bg-light-green">
        <div>
          <h5 className="fw-bold">
            Fill the <span className="text-success">Recipes</span>!
          </h5>
          <p className="text-muted mb-0">
            You can now fill the meals easily using the table and form,
            click here and fill it with the table!
          </p>
        </div>
        <Link to="/dashboard/RecipeData/newRecipe" className="btn btn-success d-flex align-items-center">
          Fill Recipes →
        </Link>
      </div>
    </div>
    </>
  
  )
}
