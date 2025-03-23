import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import profile from "../../../assets/profile.png";

export default function NavBar({ userdata }) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-white shadow-sm px-3"
       
      >
        <div className="container-fluid d-flex flex-row justify-content-between align-items-center p-4  rounded-pill "  style={{ backgroundColor: "#F8F9FB" }}>
          <div
            className="input-group rounded-pill border px-3 py-1 bg-light"
            style={{ maxWidth: "700px" }}
          >
            <span className="input-group-text bg-transparent border-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent"
              placeholder="Search Here"
            />
          </div>

          <div className="d-flex flex-row align-items-center gap-3">
            <div className="d-flex flex-row align-items-center">
              <img
                src={profile}
                alt="User Avatar"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span className="fw-medium">
                {userdata?.username || "User Name"}
              </span>
              <span className="ms-2 text-secondary">&#9662;</span>
            </div>

            <div className="position-relative">
              <FaBell className="text-secondary fs-5" />
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger p-1 rounded-circle"></span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
