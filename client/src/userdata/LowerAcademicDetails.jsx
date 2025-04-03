import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LowerAcademicDetails = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    tenthPercentage: "",
    twelfthPercentage: "",
    tenthBoardOfStudy: "",
    tenthSchoolName: "",
    twelfthBoardOfStudy: "",
    twelfthSchoolName: "",
    tenthMediumOfStudy: "",
    tenthYearOfPassing: "",
    twelfthMediumOfStudy: "",
    twelfthYearOfPassing: "",
    tenthGraduatingState: "",
    twelfthGraduatingState: "",
    diplomaSpecialization: "",
    diplomaGraduatingState: "",
    diplomaPercentage: "",
    diplomaYearOfPassing: "",
  });

  // Fetch data from sessionStorage on page load
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    if (!storedData || !storedData.user) {
      console.log("No user data found, redirecting to login");
      navigate("/login");
      return;
    }
    console.log("Stored data:", storedData);
    setUserData(storedData.user);
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update data to backend
  const updateData = async () => {
    try {
      const response = await fetch("http://localhost:5000/loweracademicdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      console.log("Data successfully updated on server");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Handle Save button
  const handleSave = async () => {
    sessionStorage.setItem("userData", JSON.stringify({ user: userData }));
    await updateData(); // Send data to backend
    setIsEditing(false);
    alert("Academic details updated successfully!");
  };

  return (
    <div className="academic-container">
      <h2>Academic Details</h2>

      <div className="form-group">
        <label>10th Percentage</label>
        <input type="number" name="tenthPercentage" value={userData.tenthPercentage} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>12th Percentage</label>
        <input type="number" name="twelfthPercentage" value={userData.twelfthPercentage} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>10th Board of Study</label>
        <input type="text" name="tenthBoardOfStudy" value={userData.tenthBoardOfStudy} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>10th School Name</label>
        <input type="text" name="tenthSchoolName" value={userData.tenthSchoolName} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>12th Board of Study</label>
        <input type="text" name="twelfthBoardOfStudy" value={userData.twelfthBoardOfStudy} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>12th School Name</label>
        <input type="text" name="twelfthSchoolName" value={userData.twelfthSchoolName} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>10th Medium of Study</label>
        <input type="text" name="tenthMediumOfStudy" value={userData.tenthMediumOfStudy} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>10th Year of Passing</label>
        <input type="number" name="tenthYearOfPassing" value={userData.tenthYearOfPassing} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>12th Medium of Study</label>
        <input type="text" name="twelfthMediumOfStudy" value={userData.twelfthMediumOfStudy} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>12th Year of Passing</label>
        <input type="number" name="twelfthYearOfPassing" value={userData.twelfthYearOfPassing} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>10th Graduating State</label>
        <input type="text" name="tenthGraduatingState" value={userData.tenthGraduatingState} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>12th Graduating State</label>
        <input type="text" name="twelfthGraduatingState" value={userData.twelfthGraduatingState} onChange={handleChange} disabled={!isEditing} />
      </div>

      <h2>Diploma Details</h2>

      <div className="form-group">
        <label>Diploma Specialization</label>
        <input type="text" name="diplomaSpecialization" value={userData.diplomaSpecialization} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>Diploma Graduating State</label>
        <input type="text" name="diplomaGraduatingState" value={userData.diplomaGraduatingState} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>Diploma Percentage</label>
        <input type="number" name="diplomaPercentage" value={userData.diplomaPercentage} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="form-group">
        <label>Diploma Year of Passing</label>
        <input type="number" name="diplomaYearOfPassing" value={userData.diplomaYearOfPassing} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="button-group">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button onClick={handleSave}>Save</button>
          
        )}
                <button onClick={()=>navigate('/maindesktop')}>maindesktop</button>

      </div>
    </div>
  );
};

export default LowerAcademicDetails;
