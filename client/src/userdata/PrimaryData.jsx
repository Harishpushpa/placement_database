import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PrimaryData = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dob_ddmmyy: "",
    yearOfAdmission: "",
    batch: "",
    title: "",
    gender: "",
    college: "",
    department: "",
    section: "",
    email: "", // Non-editable

    // New Fields
    aadhaarNumber: "",
    alternateEmail: "",
    emergencyContact: "",
    fatherEmail: "",
    fatherMobile: "",
    fatherName: "",
    fatherDesignation: "",
    passportNumber: "",
    landline: "",
    motherEmail: "",
    motherMobile: "",
    motherName: "",
    motherDesignation: "",
    nationality: "",
    panCard: "",
    permanentAddress1: "",
    permanentAddress2: "",
    permanentCity: "",
    permanentPostalCode: "",
    primaryEmail: "",
    primaryMobile: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (!storedData || !storedData.user) {
      console.log("No user data found, redirecting to login");
      navigate("/login");
      return;
    }

    console.log("Stored data:", storedData);
    setUserData(storedData.user);
    setEditableData(storedData.user);
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5000/primarydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editableData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Data updated successfully:", data);
        setUserData(editableData);
        sessionStorage.setItem("userData", JSON.stringify({ user: editableData }));
        setIsEditing(false);
      } else {
        throw new Error(data.message || "Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditableData(userData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="primary-data-container">
      <h2>Personal Data</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="action-buttons">
        {!isEditing ? (
          <button onClick={handleEditClick} disabled={isLoading}>
            Edit
          </button>
        ) : (
          <>
            <button onClick={handleUpdateClick} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
            <button onClick={handleCancelClick} disabled={isLoading}>
              Cancel
            </button>
          </>
        )}
      </div>

      <form className="data-form">
        <fieldset disabled={!isEditing}>
          <h3>Basic Information</h3>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={editableData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editableData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth (DD-MM-YY)</label>
            <input
              type="text"
              name="dob_ddmmyy"
              value={editableData.dob_ddmmyy}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
            />
          </div>
          <div className="form-group">
            <label>Primary Email ID</label>
            <input
              type="email"
              name="primaryEmail"
              value={editableData.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Primary Mobile No</label>
            <input
              type="tel"
              name="primaryMobile"
              value={editableData.primaryMobile}
              onChange={handleChange}
            />
          </div>

          <h3>Parent Details</h3>
          <div className="form-group">
            <label>Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={editableData.fatherName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Father's Email</label>
            <input
              type="email"
              name="fatherEmail"
              value={editableData.fatherEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Father's Mobile</label>
            <input
              type="tel"
              name="fatherMobile"
              value={editableData.fatherMobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Father's Designation & Organisation</label>
            <input
              type="text"
              name="fatherDesignation"
              value={editableData.fatherDesignation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={editableData.motherName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mother's Email</label>
            <input
              type="email"
              name="motherEmail"
              value={editableData.motherEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mother's Mobile</label>
            <input
              type="tel"
              name="motherMobile"
              value={editableData.motherMobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mother's Designation & Organisation</label>
            <input
              type="text"
              name="motherDesignation"
              value={editableData.motherDesignation}
              onChange={handleChange}
            />
          </div>

          <h3>Identification</h3>
          <div className="form-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNumber"
              value={editableData.aadhaarNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>PAN Card Number</label>
            <input
              type="text"
              name="panCard"
              value={editableData.panCard}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Indian Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={editableData.passportNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={editableData.nationality}
              onChange={handleChange}
            />
          </div>

          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Alternate Email ID</label>
            <input
              type="email"
              name="alternateEmail"
              value={editableData.alternateEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Emergency Contact No</label>
            <input
              type="tel"
              name="emergencyContact"
              value={editableData.emergencyContact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Landline Number</label>
            <input
              type="tel"
              name="landline"
              value={editableData.landline}
              onChange={handleChange}
            />
          </div>

          <h3>Permanent Address</h3>
          <div className="form-group">
            <label>Address Line 1</label>
            <input
              type="text"
              name="permanentAddress1"
              value={editableData.permanentAddress1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address Line 2</label>
            <input
              type="text"
              name="permanentAddress2"
              value={editableData.permanentAddress2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="permanentCity"
              value={editableData.permanentCity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="permanentPostalCode"
              value={editableData.permanentPostalCode}
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </form>

      <button 
        onClick={() => navigate("/maindesktop")} 
        disabled={isLoading}
      >
        Go to Main Desktop
      </button>
    </div>
  );
};