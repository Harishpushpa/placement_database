import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CoCurricular = () => {
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
    email: "", // Email is not editable
    higherStudies: "",
    becExamGrade: "",
    becExamStatus: "",
    educationGap: "",
    skillCertifications: "",
    languagesKnown: "",
    sportsQuota: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedData = JSON.parse(sessionStorage.getItem("userData"));

      if (!storedData || !storedData.user) {
        console.log("No user data found, redirecting to login");
        navigate("/login");
        return;
      }

      console.log("Stored data:", storedData);
      setUserData(storedData.user);
    } catch (error) {
      console.error("Error parsing sessionStorage data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/cocurricular", {
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
        sessionStorage.setItem("userData", JSON.stringify({ user: userData })); 
      } else {
        console.error("Error updating data:", data.message);
        alert("Error updating profile.");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      alert("Failed to update profile.");
    }

    setIsEditing(false);
  };

  return (
    <div>
      <h2>Personal Data</h2>
      <form>
        {/* Existing Fields */}
        <div>
          <label>Email</label>
          <input type="text" value={userData.email} disabled /> 
        </div>

        {/* New Fields */}
        <div>
          <label>Higher Studies</label>
          <input
            type="text"
            name="higherStudies"
            value={userData.higherStudies}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>BEC Exam Grade</label>
          <input
            type="text"
            name="becExamGrade"
            value={userData.becExamGrade}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>BEC Exam Status</label>
          <input
            type="text"
            name="becExamStatus"
            value={userData.becExamStatus}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Education Gap</label>
          <input
            type="text"
            name="educationGap"
            value={userData.educationGap}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Skill Certifications</label>
          <input
            type="text"
            name="skillCertifications"
            value={userData.skillCertifications}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Languages Known</label>
          <input
            type="text"
            name="languagesKnown"
            value={userData.languagesKnown}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Sports Quota</label>
          <input
            type="text"
            name="sportsQuota"
            value={userData.sportsQuota}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </form>

      <div style={{ marginTop: "10px" }}>
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => navigate('/maindesktop')}>Main Desktop</button>
      </div>
    </div>
  );
};

export default CoCurricular;