import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({user,children}) {
    if(localStorage.getItem('token')||user)
  return children 
else
return <Navigate to='/login'/>
}
