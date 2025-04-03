import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UpperAcademicDetails.css"; // Import your CSS file for styling

export const UpperAcademicDetails = () => {
  const navigate = useNavigate();

  const [academicDetails, setAcademicDetails] = useState({
    instituteName: "",
    ugCollege: "",
    ugGraduatingState: "",
    ugGraduatingUniversity: "",
    ugBranch: "",
    ugCGPA: "",
    ugDegree: "",
    ugPercentage: "",
    ugYearOfPassing: "",
    historyOfArrears: "",
    numOfArrears: "",
    arrearsSem1: "",
    arrearsSem2: "",
    arrearsSem3: "",
    arrearsSem4: "",
    arrearsSem5: "",
    arrearsSem6: "",
    arrearsSem7: "",
    arrearsSem8: "",
    overallCGPA: "",
    sem1GPA: "",
    sem2GPA: "",
    sem3GPA: "",
    sem4GPA: "",
    sem5GPA: "",
    sem6GPA: "",
    sem7GPA: "",
    sem8GPA: "",
    totalStandingArrears: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState({ ...academicDetails });

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (!storedData || !storedData.user) {
      console.log("No user data found, redirecting to login");
      navigate("/login");
      return;
    }

    const userAcademicDetails = {
      instituteName: storedData.user.instituteName || "",
      ugCollege: storedData.user.ugCollege || "",
      ugGraduatingState: storedData.user.ugGraduatingState || "",
      ugGraduatingUniversity: storedData.user.ugGraduatingUniversity || "",
      ugBranch: storedData.user.ugBranch || "",
      ugCGPA: storedData.user.ugCGPA || "",
      ugDegree: storedData.user.ugDegree || "",
      ugPercentage: storedData.user.ugPercentage || "",
      ugYearOfPassing: storedData.user.ugYearOfPassing || "",
      historyOfArrears: storedData.user.historyOfArrears || "",
      numOfArrears: storedData.user.numOfArrears || "",
      arrearsSem1: storedData.user.arrearsSem1 || "",
      arrearsSem2: storedData.user.arrearsSem2 || "",
      arrearsSem3: storedData.user.arrearsSem3 || "",
      arrearsSem4: storedData.user.arrearsSem4 || "",
      arrearsSem5: storedData.user.arrearsSem5 || "",
      arrearsSem6: storedData.user.arrearsSem6 || "",
      arrearsSem7: storedData.user.arrearsSem7 || "",
      arrearsSem8: storedData.user.arrearsSem8 || "",
      overallCGPA: storedData.user.overallCGPA || "",
      sem1GPA: storedData.user.sem1GPA || "",
      sem2GPA: storedData.user.sem2GPA || "",
      sem3GPA: storedData.user.sem3GPA || "",
      sem4GPA: storedData.user.sem4GPA || "",
      sem5GPA: storedData.user.sem5GPA || "",
      sem6GPA: storedData.user.sem6GPA || "",
      sem7GPA: storedData.user.sem7GPA || "",
      sem8GPA: storedData.user.sem8GPA || "",
      totalStandingArrears: storedData.user.totalStandingArrears || "",
    };

    setAcademicDetails(userAcademicDetails);
    setEditableDetails(userAcademicDetails);
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    setAcademicDetails(editableDetails);
    setIsEditing(false);
  
    try {
      const storedData = JSON.parse(sessionStorage.getItem("userData"));
      if (!storedData || !storedData.user || !storedData.user.email) {
        alert("User email not found. Please log in again.");
        navigate("/login");
        return;
      }
  
      const response = await fetch("http://localhost:5000/UpperAcademicDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: storedData.user.email, // Include email
          ...editableDetails,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to update data");
  
      storedData.user = { ...storedData.user, ...editableDetails };
      sessionStorage.setItem("userData", JSON.stringify(storedData));
  
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update details. Please try again.");
    }
  };
  
  
  

  return (
    <div>
      <h2>Upper Academic Details</h2>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>Name of Institute</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="instituteName"
                  value={editableDetails.instituteName}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.instituteName || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG - College of Studies</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugCollege"
                  value={editableDetails.ugCollege}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugCollege || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG - Graduating State</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugGraduatingState"
                  value={editableDetails.ugGraduatingState}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugGraduatingState || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG - Graduating University</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugGraduatingUniversity"
                  value={editableDetails.ugGraduatingUniversity}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugGraduatingUniversity || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG Branch</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugBranch"
                  value={editableDetails.ugBranch}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugBranch || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG CGPA</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugCGPA"
                  value={editableDetails.ugCGPA}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugCGPA || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG Degree</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugDegree"
                  value={editableDetails.ugDegree}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugDegree || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG Percentage</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugPercentage"
                  value={editableDetails.ugPercentage}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugPercentage || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>UG Year of Passing</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="ugYearOfPassing"
                  value={editableDetails.ugYearOfPassing}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.ugYearOfPassing || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>History of Arrears (Y/N)</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="historyOfArrears"
                  value={editableDetails.historyOfArrears}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.historyOfArrears || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>If Yes, How Many?</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="numOfArrears"
                  value={editableDetails.numOfArrears}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.numOfArrears || "N/A"
              )}
            </td>
          </tr>
          <tr>
            <td>Total No of Standing Arrears</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="totalStandingArrears"
                  value={editableDetails.totalStandingArrears}
                  onChange={handleChange}
                />
              ) : (
                academicDetails.totalStandingArrears || "N/A"
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Semester-wise Arrears & GPA</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Arrears</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(8)].map((_, i) => (
            <tr key={i}>
              <td>Sem {i + 1}</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name={`arrearsSem${i + 1}`}
                    value={editableDetails[`arrearsSem${i + 1}`]}
                    onChange={handleChange}
                  />
                ) : (
                  academicDetails[`arrearsSem${i + 1}`] || "N/A"
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    name={`sem${i + 1}GPA`}
                    value={editableDetails[`sem${i + 1}GPA`]}
                    onChange={handleChange}
                  />
                ) : (
                  academicDetails[`sem${i + 1}GPA`] || "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={isEditing ? handleUpdateClick : handleEditClick}>
        {isEditing ? "Update" : "Edit"}
      </button>
      <button onClick={()=>navigate('/maindesktop')}>maindesktop</button>
    </div>
  );
};
