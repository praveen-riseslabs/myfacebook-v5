import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../store";
import { useThunk } from "../hooks/useThunk";
import { useEffect } from "react";
import { VALIDATE } from "../utils/formValidations";
import { useForm } from "react-hook-form";

export default function NewPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [
    doResetPassword,
    loadingResetPassword,
    errorLoadingResetPassword,
    ,
    isResetPasswordRan,
  ] = useThunk(resetPassword);

  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  //handling set new password
  const onSubmit = (data, e) => {
    e.preventDefault();
    if (!state?.userId || !state?.id) return;
    const obj = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      userId: state.userId,
      id: state.id,
    };

    doResetPassword(obj);

    if (isSubmitSuccessful) {
      reset();
    }
  };

  //handle cancel submit
  const handleCancelClick = () => {
    reset();
    navigate(-1);
  };

  //navigating after successful changed password
  useEffect(() => {
    if (isResetPasswordRan) {
      navigate("/login", { replace: true });
    }
  }, [isResetPasswordRan, navigate]);

  //navigating back if user id and id are not present
  useEffect(() => {
    if (!state?.userId || !state?.id) {
      navigate("/forgot-password", { replace: true });
    }
  }, [state?.id, navigate, state?.userId]);

  return (
    <div className="d-flex justify-content-center h-100 cbg-secondary container-fluid">
      <div
        className="cbg-white p-4 col-sm-8 col-md-6 col-lg-4 col-10 position-absolute translate-middle start-50 top-50 rounded-4"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="">New Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register(
                "confirmPassword",
                VALIDATE(getValues).confirmPassword
              )}
            />
            <div className="text-error">{errors.confirmPassword?.message}</div>
          </div>

          {/* server side error handling */}
          <div className="text-danger mt-3">
            {errorLoadingResetPassword && `* ${errorLoadingResetPassword}`}
          </div>

          {loadingResetPassword ? (
            <div className="spinner-border ctext-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="d-flex justify-content-around align-items-center">
              <button className="btn btn-secondary" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
