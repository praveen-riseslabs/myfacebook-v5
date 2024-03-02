import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VALIDATE } from "../utils/formValidations";

function Registration() {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    getValues
  } = useForm({ mode: "all" });


  let navigate = useNavigate();


  //handling registration
  const onSubmit = (data,e) => {
    e.preventDefault();


    if (isSubmitSuccessful) {
      reset();
    }
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
              {...register("confirmPassword", VALIDATE(getValues).confirmPassword)}
            />
            <div className="text-error">{errors.confirmPassword?.message}</div>
          </div>

          {/* server side error handling */}
          <div className="text-danger mt-3">
          </div>

          <div className="d-flex justify-content-center mt-4 px-5">
            {"loadingUserRegister" ? (
              <div className="spinner-border ctext-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            )}
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
