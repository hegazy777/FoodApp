

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Shard/Header/Header";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


 
  
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("datadsdasdsad", response);
      setUsers(response.data.data);
    } catch (error) {}
  };



  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
     <Header
        title={"User List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="title">
            <h1 className="m-0 fw-bold">User List Table Details</h1>
            <p className="text-muted">You can check all details</p>
          </div>
          <div className="addCategory">
            <button className="btn btn-success" >
              <i className="fa fa-plus"></i> Add User
            </button>
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
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.creationDate}</td>
                    <td data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-ellipsis-v text-secondary"></i>
                      <div className="dropdown">
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item">
                              <i
                                className="fa fa-eye me-2"
                                style={{ color: "#009247" }}
                              ></i>{" "}
                              View
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item">
                              <i
                                className="fa fa-edit me-2"
                                style={{ color: "#009247" }}
                              ></i>{" "}
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              
                            >
                              <i
                                className="fa fa-trash me-2"
                                style={{ color: "#009247" }}
                              ></i>{" "}
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
                      src=""
                      alt="No Data"
                      className="img-fluid"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
