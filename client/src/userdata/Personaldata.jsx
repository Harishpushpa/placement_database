import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Personaldata.css"; // Import your CSS file for styling
export const Personaldata = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dob_ddmmyy: "",
    dob_mmddyy: "",
    dob_yyyymmdd: "",
    yearOfAdmission: "",
    batch: "",
    title: "",
    gender: "",
    college: "",
    department: "",
    section: "",
    email: "" // Email is not editable
  });

  const [isEditing, setIsEditing] = useState(false);
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
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to update user data in the backend
  const updatedData = async () => {
    try {
      const response = await fetch("http://localhost:5000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Data updated successfully:", data);
        alert("Profile updated successfully!");
        sessionStorage.setItem("userData", JSON.stringify({ user: userData })); // Update session storage
      } else {
        console.error("Error updating data:", data.message);
        alert("Error updating profile.");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Failed to update profile.");
    }
  };

  // Handle update button click
  const handleUpdate = async () => {
    await updatedData(); // Call API to update data
    setIsEditing(false); // Disable editing mode after update
  };

  return (
    <div>
      <h2>Personal Data</h2>
      <form>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Date of Birth (DD-MM-YY)</label>
          <input
            type="text"
            name="dob_ddmmyy"
            value={userData.dob_ddmmyy}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Date of Birth (MM-DD-YY)</label>
          <input
            type="text"
            name="dob_mmddyy"
            value={userData.dob_mmddyy}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Date of Birth (YYYY-MM-DD)</label>
          <input
            type="text"
            name="dob_yyyymmdd"
            value={userData.dob_yyyymmdd}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Year of Admission</label>
          <input
            type="number"
            name="yearOfAdmission"
            value={userData.yearOfAdmission}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Batch</label>
          <input
            type="text"
            name="batch"
            value={userData.batch}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={userData.title}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>College</label>
          <input
            type="text"
            name="college"
            value={userData.college}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={userData.department}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Section</label>
          <input
            type="text"
            name="section"
            value={userData.section}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={userData.email} disabled /> {/* Email is non-editable */}
        </div>
      </form>

      <div style={{ marginTop: "10px" }}>
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={()=>navigate('/maindesktop')}>maindesktop</button>
      </div>
    </div>
  );
};
