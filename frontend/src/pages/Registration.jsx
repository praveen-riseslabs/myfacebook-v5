import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VALIDATE } from "../utils/formValidations";
import { useState } from "react";
import axios from 'axios'


function Registration() {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const baseURL = import.meta.env.VITE_SERVER_BASE_API_V1;


  let navigate = useNavigate();

  //handling registration
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(username, email, password, confirmPassword)
    axios
      .post("http://localhost:4000/api/v1/user/register", { username, email, password, confirmPassword })
      .then((result) => {
        console.log(result);
        localStorage.setItem('token', result.data.token)
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));

    // if (isSubmitSuccessful) {
    //   reset();
    // }
  };

  return (
    <div className="d-flex justify-content-center h-100 cbg-secondary container-fluid">
      <div
        className="cbg-white p-4 col-sm-8 col-md-6 col-lg-4 col-10 position-absolute translate-middle start-50 top-50 rounded-4"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="">Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* username */}
          <div>
            <label className="form-label">Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter your username"
              {...register("username", VALIDATE().username)}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="text-error">{errors.username?.message}</div>
          </div>

          {/* email */}
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              {...register("email", VALIDATE().email)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="text-error">{errors.email?.message}</div>
          </div>

          {/* password */}
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              {...register("password", VALIDATE().password)}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-error">{errors.password?.message}</div>
          </div>

          {/* confirmPassword */}
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter confirm password"
              {...register(
                "confirmPassword",
                VALIDATE(getValues).confirmPassword
              )}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="text-error">{errors.confirmPassword?.message}</div>
          </div>

          {/* server side error handling */}
          <div className="text-danger mt-3"></div>

          <div className="d-flex justify-content-center mt-4 px-5">
            {/* 
            {"loadingUserRegister" ? (
              <div className="spinner-border ctext-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            )}
             */}
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <span className="d-flex gap-2">
              Already have an Account?
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
