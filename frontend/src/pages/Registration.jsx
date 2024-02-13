import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

function Registration() {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="h-100"
      style={{
        background: `repeating-linear-gradient(to left top, ${COLORS.primary} 0em,${COLORS.secondary} 95vh)`,
      }}
    >
      <form
        className="p-2 rounded position-relative bg-dark h-100"
        onSubmit={handleSubmit}
      >
        {/* form heading */}
        <div className="text-white mt-5 mb-3 ms-md-5 ms-0">
          <h1>
            <span
              style={{
                borderBottom: "3px solid",
                borderImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary}) 1`,
              }}
            >
              Reg
            </span>
            istration
          </h1>
          <small className="text-secondary">
            <em>Create your new account</em>
          </small>
        </div>
        {/* user details */}
        <div className="d-flex flex-column gap-2 container">
          <div className="row">
            <div className="col-6">
              <label className="form-label text-white">Fullname</label>
              <input
                type="text"
                name="fullname"
                className="form-control p-2 shadow-none"
                placeholder="Fullname"
                value={userData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label text-white">Username</label>
              <input
                type="text"
                name="username"
                className="form-control p-2 shadow-none"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label text-white">Email</label>
              <input
                type="text"
                name="email"
                className="form-control p-2 shadow-none"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label className="form-label text-white">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control p-2 shadow-none"
                placeholder="Phone Number"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label text-white">Password</label>
              <input
                type="text"
                name="password"
                className="form-control p-2 shadow-none"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label className="form-label text-white">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                className="form-control p-2 shadow-none"
                placeholder="Confirm Password"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </div>
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
            Register
          </button>
        </div>

        {/* divider */}
        <Divider
          sx={{ marginBlock: "3rem", backgroundColor: "gray" }}
        ></Divider>

        {/* alt navigation */}
        <div className="text-center">
          <div className="text-white">
            Already have an Account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
