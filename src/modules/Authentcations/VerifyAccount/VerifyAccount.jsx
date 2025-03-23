import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../../assets/logo.png";
import { axiosinstance, UserUrls } from "../../Urls/Urls";
import axios from "axios";
export default function VerifyAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put("https://upskilling-egypt.com:3006/api/v1/Users/verify", data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  }; 

  return ( 
    <div className="auht-container">
      <div className="container-fluid">
        <div className="row vh-100 justify-content-center align-content-center ">
          <div className="col-md-5 bg-white  rounded-3">
            <div>
              <div className="logo-container d-flex justify-content-center">
                <img className="w-75" src={logo} alt="" />
              </div>
              <div className="tiitle my-3">
                <h3>verify Account</h3>
                <p>
                  No worries! Please enter your email and your Code{" "}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    {...register("code", {
                      required: "code is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="code"
                    aria-label="code"
                    aria-describedby="basic-addon2"
                  />
                </div>

                <div>
                  <button type="submit" className="btn btn-success w-100 my-3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
