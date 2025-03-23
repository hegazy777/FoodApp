import React from "react";
import { axiosinstance, UserUrls } from "../../Urls/Urls";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosinstance.post(UserUrls.ResetPassword, data);
      navigate('/login');
    } catch (error) {
      console.error(error);
       alert(error.response?.data?.message );
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
                <h3>Forgot Your Password?</h3>
                <p>
                  No worries! Please enter your email and we will send a
                  password reset link{" "}
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
                    {...register("seed", {
                      required: "seed is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="seed"
                    aria-label="seed"
                    aria-describedby="basic-addon2"
                  />
                </div>


                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    {...register("password", {
                      required: "Password is required",
                     
                      message: "Inter 5 char",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="New Password"
                    aria-label="Password"
                    aria-describedby="basic-addon2"
                  />
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    {...register("confirmPassword", {
                      required: "Password is required",
                      message: "Inter 5 char",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Conferm Password"
                    aria-label="confirmPassword"
                    aria-describedby="basic-addon2"
                  />
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.confirmPassword.message}</p>
                )}
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
