import React from "react";
import { NavLink } from "react-router-dom";

const MyDocument = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div style={{float:'right'}} className="mb-3">
            <NavLink to="/create" className="btn btn-success" style={{ textDecoration: "none" }}>
              Create
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <NavLink to="/edit" className="btn btn-secondary" style={{ textDecoration: "none" }}>
                    Edit
                  </NavLink>
                  <NavLink to="/view" className="btn btn-success mx-1" style={{ textDecoration: "none" }}>
                    View
                  </NavLink>
                  <NavLink to="/delete" className="btn btn-danger" style={{ textDecoration: "none" }}>
                    Delete
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDocument;
