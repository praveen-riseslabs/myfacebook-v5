import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import { useSelector } from "react-redux";

function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [doRegisterUser, loadingUserRegister, errorUserRegister] =
    useThunk(registerUser);

  let navigate = useNavigate();

  //extracting user state from store
  const { user, loggedIn } = useSelector((state) => state.user);

  //handling registration
  const handleRegistration = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;

    const userData = { username, email, password, confirmPassword };
    doRegisterUser(userData);

    // if (isSubmitSuccessful) {
    //   reset();
    // }
  };

  //navigating after user successfully registered
  useEffect(() => {
    if (Object.keys(user).length === 0 && !loggedIn) return;
    navigate("/", { replace: true });
  }, [loggedIn, navigate, user]);

  return (
    <div className="d-flex justify-content-center h-100 cbg-secondary container-fluid">
      <div
        className="cbg-white p-4 col-sm-8 col-md-6 col-lg-4 col-10 position-absolute translate-middle start-50 top-50 rounded-4"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="">Registration</h2>
        <form onSubmit={handleRegistration}>
          <div>
            <label className="form-label">Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* server side error handling */}
          <div className="text-danger mt-3">
            {errorUserRegister && `* ${errorUserRegister}`}
          </div>

          <div className="d-flex justify-content-center mt-4 px-5">
            {loadingUserRegister ? (
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
