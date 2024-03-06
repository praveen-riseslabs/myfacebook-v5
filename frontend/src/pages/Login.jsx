import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  axios.defaults.withCredentials = true

  //handling login
  const handleLogin = (e) => {
    e.preventDefault();
    // setUsernameOrEmail("")
    // setPassword("")
    // const data = { usernameOrEmail, password };
    axios
    .post("http://localhost:4000/api/v1/user/login", { usernameOrEmail , password })
    .then((result) => {
      console.log(result);
      // if (result.data === "Success") {
        // navigate("/home");
        navigate("/dashboard");

      // }
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center h-100 cbg-secondary container-fluid">
      <div
        className="cbg-white p-4 col-sm-8 col-md-6 col-lg-4 col-10 position-absolute translate-middle start-50 top-50 rounded-4"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="">Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label className="form-label">Username or Email</label>
            <input
              className="form-control"
              placeholder="Enter username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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

          {/* server side error handling */}
          <div className="text-danger mt-3">
          </div>

          <div className="d-flex justify-content-center mt-4 px-5">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            {/* {"loadingLogin" ? (
              <div className="spinner-border ctext-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            )} */}
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-1 mt-3">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password
            </Link>
            <span className="d-flex gap-2">
              Don't have an Account?
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
