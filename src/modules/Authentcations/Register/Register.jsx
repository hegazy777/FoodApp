import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaGlobe, FaPhone, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../../assets/logo.png";
import { BsWatch } from "react-icons/bs";
import { axiosinstance, UserUrls } from "../../Urls/Urls";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosinstance.post(UserUrls.Register, data);

      console.log("register:", response.data);
      // alert("Login Successful!");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        saveloginData();
      }
      toast.success("register  Successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/verifyAccount");
    } catch (error) {
      console.error(error);
      // alert(error.response?.data?.message );
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-50">
        <div className="logo-container d-flex justify-content-center">
          <img className="w-75" src={logo} alt="" />
        </div>
        <h3 className="text-start">Register</h3>
        <p className="text-stRT text-muted">Welcome Back! Please enter your details</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">UserName</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input type="text" className="form-control" placeholder="UserName" {...register("userName", { required: "Username is required" })} />
              </div>
              {errors.username && <small className="text-danger">{errors.userName.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Enter your E-mail</label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input type="email" className="form-control" placeholder="Enter your E-mail" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } })} />
              </div>
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Country</label>
              <div className="input-group">
                <span className="input-group-text"><FaGlobe /></span>
                <input type="text" className="form-control" placeholder="Country" {...register("country", { required: "Country is required" })} />
              </div>
              {errors.country && <small className="text-danger">{errors.country.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text"><FaPhone /></span>
                <input type="text" className="form-control" placeholder="PhoneNumber" {...register("phoneNumber", { required: "Phone number is required", pattern: { value: /^[0-9]+$/, message: "Invalid phone number" } })} />
              </div>
              {errors.phone && <small className="text-danger">{errors.phoneNumber.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" {...register("password", { required: "Password is required"})} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                <i
                      className={
                        showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                      }
                    ></i>
                </button>
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" {...register("confirmPassword", { required: "Please confirm your password" })} />
              </div>
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
            </div>
          </div>
          <div className="text-end mt-2 my-2">

            <a href="/login" className="text-success">Login Now?</a>
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>

        
        </form>
      </div>
    </div>
  );
}
