import React, { useState } from "react";
import logo from "../../../assets/Logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosinstance, UserUrls } from "../../Urls/Urls";
import { validationRules } from "../../Urls/Validations";
export default function Login({ saveloginData }) {

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosinstance.post(UserUrls.Login, data);

      console.log("Login data:", response.data);
      // alert("Login Successful!");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        saveloginData();
      }
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/dashboard");
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
    <div className="auht-container ">
      <div className="container-fluid">
        <div className="row vh-100 justify-content-center align-content-center ">
          <div className="col-md-5 bg-white  rounded-3">
            <div>
              <div className="logo-container d-flex justify-content-center">
                <img className="w-75" src={logo} alt="" />
              </div>
              <div className="tiitle my-3">
                <h3>Login</h3>
                <p>Welcome Back! Please enter your details</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    {...register("email", validationRules.email)}
                    type="text"
                    className="form-control"
                    placeholder="Email"
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 5,
                        message: "Enter at least 5 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"} 
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon2"
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}

                <div className="d-flex justify-content-between">
                  <Link
                    to="/register"
                    className="text-decoration-none text-black"
                  >
                    Register Now?
                  </Link>
                  <Link
                    to="/forgetPass"
                    className="text-decoration-none text-success"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div>
                  <button type="submit" className="btn btn-success w-100 my-3">
                    Login
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
