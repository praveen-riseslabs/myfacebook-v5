import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants";
import {Divider} from "@mui/material"
import {Link} from "react-router-dom"

function Login() {
  const [userData, setUserData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="h-100 relative"
      style={{
        background: `repeating-linear-gradient(to left top, ${COLORS.primary} 0em,${COLORS.secondary} 95vh)`,
      }}
    >
      <form className="p-4 p-md-5 rounded bg-dark h-100" onSubmit={handleSubmit}>
        {/* form heading */}
        <div className="text-white my-5">
          <h1>
            <span
              style={{
                borderBottom: "3px solid",
                borderImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary}) 1`,
              }}
            >
              Lo
            </span>
            gin
          </h1>
          <small className="text-secondary"><em>Please login to continue to our site</em></small>
        </div>
        {/* user details */}
        <div className="d-flex flex-column gap-3 mt-4">
          <div>
            <label className="form-label text-white">Username or Email</label>
            <input
              type="text"
              name="usernameOrEmail"
              className="form-control p-3 shadow-none"
              placeholder="Username or Email"
              value={userData.usernameOrEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control p-3 shadow-none"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* actions */}
        <div className="d-grid mt-5 d-flex justify-content-center">
          <button
            className="btn btn-primary w-50 p-2"
            type="submit"
            style={{
              background: `linear-gradient(to right, ${COLORS.primary},${COLORS.secondary})`,
            }}
          >
            Login
          </button>
        </div>

        {/* divider */}
        <Divider
          sx={{ marginBlock: "3rem", backgroundColor: "gray" }}
        ></Divider>
        
        {/* alt navigation */}
        <div className="text-center">
          <Link to="/forgotpassword" className="text-decoration-none">
            Forget password
          </Link>
          <div className="text-white">
            Don't have an Account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
