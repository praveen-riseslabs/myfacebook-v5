import React, { useState } from 'react';

const HealthRecords = () => {
  const [records, setRecords] = useState([
    // Initial health record data (you can populate this array with your data structure)
    { date: '2023-12-15',
     description: 'Health checkup report',
      fileUrl: 'path/to/file.pdf',
    userName: 'John Doe',
    doctorName: 'Dr. Rahul',
    hospitalName: 'Paras Hospital',
    visitDate: '2023-12-15',
    adharCardNumber: '1234 5667 9012',
    phoneNumber: '9876543210',

    },
    // Add more initial health record data as needed
  ]);

  const [formData, setFormData] = useState({
    userName: '',
    doctorName: '',
    hospitalName: '',
    visitDate: '',
    adharCardNumber: '',
    phoneNumber: '',
    description: ''
  })

  // Function to handle health record uploads
  const handleChange =(e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };
  const handleUpload = (e) => {
    e.preventDefault();
    // Logic to handle health record uploads
    // This function will handle the file upload and update the records state
    const newRecord = { ...formData };
    setRecords([...records, newRecord]);
    // Clear form fields after submission
    setFormData({
      userName: '',
      doctorName: '',
      hospitalName: '',
      visitDate: '',
      adharCardNumber: '',
      phoneNumber: '',
      description: ''
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Health Records</h2>

      {/* Form for uploading health records */}
      <form className="row g-3" onSubmit={handleUpload}>
        <div className="col-md-6">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="userName" 
            name="userName" 
            value={formData.userName} 
            onChange={handleChange} 
            required 
          />
        </div>
      
        <div className="col-md-6">
          <label htmlFor="doctorName" className="form-label">Doctor Name</label>
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
          <label htmlFor="hospitalName" className="form-label">Hospital Name</label>
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
          <label htmlFor="visitDate" className="form-label">Visit Date</label>
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
          <label htmlFor="adharCardNumber" className="form-label">Adhar Card Number</label>
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
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
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
          <label htmlFor="description" className="form-label">Description</label>
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
        <input type="file" accept=".pdf, .doc, .docx" />
          <button type="submit" className="btn btn-primary">Upload</button>
        </div>

        
      </form>


      {/* Display health records */}
      <div className="mt-4">
        {records.map((record, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Date: {record.date}</h5>
              <p className="card-text">Description: {record.description}</p>
              <p className="card-text">User Name: {record.userName}</p>
              <p className="card-text">Doctor Name: {record.doctorName}</p>
              <p className="card-text">Hospital Name: {record.hospitalName}</p>
              <p className="card-text">Visit Date: {record.visitDate}</p>
              <p className="card-text">Adhar Card Number: {record.adharCardNumber}</p>
              <p className="card-text">Phone Number: {record.phoneNumber}</p>
              {/* Display a link to the file (assuming it's a PDF) */}
              <a href={record.fileUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View File</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthRecords;
