import React from 'react'
import { axiosinstance, UserUrls } from '../../Urls/Urls';
import { useForm } from 'react-hook-form';
import Logo from "../../../assets/logo.png";
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {

   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    let navigate = useNavigate();


     const onSubmit = async (data) => {
        try {
          const response = await axiosinstance.post(UserUrls.ForgetPassword, data);
          navigate('/changePass');
        } catch (error) {
          console.error( error);
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
                <img className="w-75" src={Logo} alt="" />
              </div>
              <div className="tiitle my-3">
                <h3>Forgot Your Password?</h3>
                <p>No worries! Please enter your email and we will send a password reset link </p>
                
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
  )
}
