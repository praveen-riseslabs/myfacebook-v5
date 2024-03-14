import { useState, useEffect } from "react";
import axios from "axios";

const HealthRecords = () => {
  const [records, setRecords] = useState([
    // Initial health record data (you can populate this array with your data structure)
    {
      date: "2023-12-15",
      description: "Health checkup report",
      fileUrl: "path/to/file.pdf",
      username: "John Doe",
      doctorName: "Dr. Rahul",
      hospitalName: "Paras Hospital",
      visitDate: "2023-12-15",
      adharCardNumber: "1234 5667 9012",
      phoneNumber: "9876543210",
    },
    // Add more initial health record data as needed
  ]);

  const [formData, setFormData] = useState({
    username: "",
    doctorName: "",
    hospitalName: "",
    visitDate: "",
    adharCardNumber: "",
    phoneNumber: "",
    description: "",
    files: [],
  });

  useEffect(() => {
    // Fetch data from API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/health/");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Function to handle health record uploads
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    // Logic to handle health record uploads
    const fd = new FormData();
    fd.append("username", formData.username);
    fd.append("doctorName", formData.doctorName);
    fd.append("hospitalName", formData.hospitalName);
    fd.append("description", formData.description);
    fd.append("adharCardNumber", formData.adharCardNumber);
    fd.append("phoneNumber", formData.phoneNumber);
    fd.append("files", formData.files[0]);

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:4000/api/v1/health/new", fd, {
        headers: { Authorization: "Bearer " + token },
      });
      // If successful, update state and clear form fields
      setRecords([...records, formData]);
      setFormData({
        username: "",
        doctorName: "",
        hospitalName: "",
        visitDate: "",
        adharCardNumber: "",
        phoneNumber: "",
        description: "",
        files: [],
      });
    } catch (error) {
      console.log("Error uploading data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Health Records</h2>

      {/* Form for uploading health records */}
      <form className="row g-3" onSubmit={handleUpload}>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="doctorName" className="form-label">
            Doctor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="hospitalName" className="form-label">
            Hospital Name
          </label>
          <input
            type="text"
            className="form-control"
            id="hospitalName"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="visitDate" className="form-label">
            Visit Date
          </label>
          <input
            type="date"
            className="form-control"
            id="visitDate"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="adharCardNumber" className="form-label">
            Adhar Card Number
          </label>
          <input
            type="text"
            className="form-control"
            id="adharCardNumber"
            name="adharCardNumber"
            value={formData.adharCardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="col-12">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            className="form-control"
            name="file"
            onChange={(e) => {
              const file = e.target.files;
              setFormData({ ...formData, files: file });
            }}
          />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </div>
      </form>

      {/* Display health records */}
      <div className="mt-4">
        {records.map((record, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Date: {record.date}</h5>
              <p className="card-text">Description: {record.description}</p>
              <p className="card-text">User Name: {record.username}</p>
              <p className="card-text">Doctor Name: {record.doctorName}</p>
              <p className="card-text">Hospital Name: {record.hospitalName}</p>
              <p className="card-text">Visit Date: {record.visitDate}</p>
              <p className="card-text">
                Adhar Card Number: {record.adharCardNumber}
              </p>
              <p className="card-text">Phone Number: {record.phoneNumber}</p>
              {/* Display a link to the file (assuming it's a PDF) */}
              <a
                href={record.fileUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthRecords;
