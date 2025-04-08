const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

mongoose.connect('mongodb://localhost:27017/studentdata')
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(`DB Error: ${err}`));

const adminSchema=new mongoose.Schema({
  email:{type:String,
    required:true,
    unique:true},
  password:{type:String,
    required:true},
})

const Admin=mongoose.model('Admin',adminSchema)

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Personal details
  firstName: { type: String },
  lastName: { type: String },
  dob_ddmmyy: { type: String, match: /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{2}$/ },
  yearOfAdmission: { type: Number, min: 1900, max: 2100 },
  batch: { type: String },
  title: { type: String, enum: ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."] },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  college: { type: String },
  department: { type: String },
  section: { type: String },

  // New fields for academic details
  tenthPercentage: { type: Number },
  twelfthPercentage: { type: Number },
  tenthBoardOfStudy: { type: String },
  tenthSchoolName: { type: String },
  twelfthBoardOfStudy: { type: String },
  twelfthSchoolName: { type: String },
  tenthMediumOfStudy: { type: String },
  tenthYearOfPassing: { type: Number },
  twelfthMediumOfStudy: { type: String },
  twelfthYearOfPassing: { type: Number },
  tenthGraduatingState: { type: String },
  twelfthGraduatingState: { type: String },

  // Diploma details
  diplomaSpecialization: { type: String },
  diplomaGraduatingState: { type: String },
  diplomaPercentage: { type: Number },
  diplomaYearOfPassing: { type: Number },

  // Upper academic details
  instituteName: { type: String },
  ugCollege: { type: String },
  ugGraduatingState: { type: String },
  ugGraduatingUniversity: { type: String },
  ugBranch: { type: String },
  ugCGPA: { type: String },
  ugDegree: { type: String },
  ugPercentage: { type: String },
  ugYearOfPassing: { type: String },
  historyOfArrears: { type: String },
  numOfArrears: { type: String },
  arrearsSem1: { type: String },
  arrearsSem2: { type: String },
  arrearsSem3: { type: String },
  arrearsSem4: { type: String },
  arrearsSem5: { type: String },
  arrearsSem6: { type: String },
  arrearsSem7: { type: String },
  arrearsSem8: { type: String },
  overallCGPA: { type: String },
  sem1GPA: { type: String },
  sem2GPA: { type: String },
  sem3GPA: { type: String },
  sem4GPA: { type: String },
  sem5GPA: { type: String },
  sem6GPA: { type: String },
  sem7GPA: { type: String },
  sem8GPA: { type: String },
  totalStandingArrears: { type: String },

  // Primary data
  aadhaarNumber: { type: String, match: /^[2-9]{1}[0-9]{11}$/ },
  alternateEmail: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  emergencyContact: { type: String, match: /^\d{10}$/ },
  fatherEmail: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  fatherMobile: { type: String, match: /^\d{10}$/ },
  fatherName: { type: String },
  fatherDesignation: { type: String },
  passportNumber: { type: String, match: /^[A-Z]{1}[0-9]{7}$/ },
  landline: { type: String, match: /^\d{10}$/ },
  motherEmail: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  motherMobile: { type: String, match: /^\d{10}$/ },
  motherName: { type: String },
  motherDesignation: { type: String },
  nationality: { type: String },
  panCard: { type: String, match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ },
  permanentAddress1: { type: String },
  permanentAddress2: { type: String },
  permanentCity: { type: String },
  permanentPostalCode: { type: String, match: /^\d{6}$/ },
  primaryEmail: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  primaryMobile: { type: String, match: /^\d{10}$/ },

  //cocurricular details
  higherStudies: { type: String, default: "" },
  becExamGrade: { type: String, default: "" },
  becExamStatus: { type: String, default: "" },
  educationGap: { type: String, default: "" },
  skillCertifications: { type: String, default: "" },
  languagesKnown: { type: String, default: "" },
  sportsQuota: { type: String, default: "" }
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User email already exists" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Server error:", error); // Log error for debugging
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Login Endpoint
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (userData.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({ user: userData, message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post("/adminlogin",async(req,res)=>{
  const {email,password}=req.body;

  if(!email || !password){
    return res.status(400).json({message:"Email and password are required"});
  }

  const AdminData = await Admin.findOne({email});
  if(!AdminData){
    return res.status(400).json({message:"Invalid email or password"});
  }

  if(AdminData.password !== password){
    return res.status(400).json({message:"Invalid email or password"});
  }

  res.json({user:AdminData,message:"Admin logged in successfully"});

})

app.post("/update", async (req, res) => {
  try {
    const {
      email,
      firstName = "",
      lastName = "",
      dob_ddmmyy = "",
      dob_mmddyy = "",
      dob_yyyymmdd = "",
      yearOfAdmission = "",
      batch = "",
      title = "",
      gender = "",
      college = "",
      department = "",
      section = ""
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Default empty data in case no data is provided
    const defaultData = {
      firstName: firstName || "",
      lastName: lastName || "",
      dob_ddmmyy: dob_ddmmyy || "",
      dob_mmddyy: dob_mmddyy || "",
      dob_yyyymmdd: dob_yyyymmdd || "",
      yearOfAdmission: yearOfAdmission || "",
      batch: batch || "",
      title: title || "",
      gender: gender || "",
      college: college || "",
      department: department || "",
      section: section || ""
    };

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: defaultData },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Data updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
});


app.post("/loweracademicdetails", async (req, res) => {
  try {
    const {
      email,
      tenthPercentage = "",
      twelfthPercentage = "",
      tenthBoardOfStudy = "",
      tenthSchoolName = "",
      twelfthBoardOfStudy = "",
      twelfthSchoolName = "",
      tenthMediumOfStudy = "",
      tenthYearOfPassing = "",
      twelfthMediumOfStudy = "",
      twelfthYearOfPassing = "",
      tenthGraduatingState = "",
      twelfthGraduatingState = "",
      diplomaSpecialization = "",
      diplomaGraduatingState = "",
      diplomaPercentage = "",
      diplomaYearOfPassing = ""
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required for updating user data" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { 
        $set: {
          tenthPercentage,
          twelfthPercentage,
          tenthBoardOfStudy,
          tenthSchoolName,
          twelfthBoardOfStudy,
          twelfthSchoolName,
          tenthMediumOfStudy,
          tenthYearOfPassing,
          twelfthMediumOfStudy,
          twelfthYearOfPassing,
          tenthGraduatingState,
          twelfthGraduatingState,
          diplomaSpecialization,
          diplomaGraduatingState,
          diplomaPercentage,
          diplomaYearOfPassing
        }
      },
      { new: true, upsert: true } // `upsert: true` ensures user creation if not found
    );

    res.status(200).json({ message: "Data updated successfully", user: updatedUser });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
});


  app.post("/UpperAcademicDetails", async (req, res) => {
    try {
      const {
        email,
        instituteName,
        ugCollege,
        ugGraduatingState,
        ugGraduatingUniversity,
        ugBranch,
        ugCGPA,
        ugDegree,
        ugPercentage,
        ugYearOfPassing,
        historyOfArrears,
        numOfArrears,
        arrearsSem1,
        arrearsSem2,
        arrearsSem3,
        arrearsSem4,
        arrearsSem5,
        arrearsSem6,
        arrearsSem7,
        arrearsSem8,
        overallCGPA,
        sem1GPA,
        sem2GPA,
        sem3GPA,
        sem4GPA,
        sem5GPA,
        sem6GPA,
        sem7GPA,
        sem8GPA,
        totalStandingArrears,
      } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { email }, // Find by email
        {
          $set: {
            instituteName,
            ugCollege,
            ugGraduatingState,
            ugGraduatingUniversity,
            ugBranch,
            ugCGPA,
            ugDegree,
            ugPercentage,
            ugYearOfPassing,
            historyOfArrears,
            numOfArrears,
            arrearsSem1,
            arrearsSem2,
            arrearsSem3,
            arrearsSem4,
            arrearsSem5,
            arrearsSem6,
            arrearsSem7,
            arrearsSem8,
            overallCGPA,
            sem1GPA,
            sem2GPA,
            sem3GPA,
            sem4GPA,
            sem5GPA,
            sem6GPA,
            sem7GPA,
            sem8GPA,
            totalStandingArrears,
          },
        },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: "Data updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating data", error: error.message });
    }
  });
  
// Primary Data Update endpoint
app.post("/primarydata", async (req, res) => {
  try {
      // Check if request body is empty
      if (Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "No data provided" });
      }

      const {
          email,
          firstName,
          lastName,
          dob_ddmmyy,
          yearOfAdmission,
          batch,
          title,
          gender,
          college,
          department,
          section,
          aadhaarNumber,
          alternateEmail,
          emergencyContact,
          fatherEmail,
          fatherMobile,
          fatherName,
          fatherDesignation,
          passportNumber,
          landline,
          motherEmail,
          motherMobile,
          motherName,
          motherDesignation,
          nationality,
          panCard,
          permanentAddress1,
          permanentAddress2,
          permanentCity,
          permanentPostalCode,
          primaryEmail,
          primaryMobile
      } = req.body;

      if (!email) {
          return res.status(400).json({ message: "Email is required" });
      }

      const updatedUser = await User.findOneAndUpdate(
          { email },
          {
              $set: {
                  firstName,
                  lastName,
                  dob_ddmmyy,
                  yearOfAdmission,
                  batch,
                  title,
                  gender,
                  college,
                  department,
                  section,
                  aadhaarNumber,
                  alternateEmail,
                  emergencyContact,
                  fatherEmail,
                  fatherMobile,
                  fatherName,
                  fatherDesignation,
                  passportNumber,
                  landline,
                  motherEmail,
                  motherMobile,
                  motherName,
                  motherDesignation,
                  nationality,
                  panCard,
                  permanentAddress1,
                  permanentAddress2,
                  permanentCity,
                  permanentPostalCode,
                  primaryEmail,
                  primaryMobile
              }
          },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ 
          message: "Primary data updated successfully", 
          user: updatedUser 
      });
  } catch (error) {
      console.error("Error updating primary data:", error);
      res.status(500).json({ 
          message: "Error updating primary data", 
          error: error.message 
      });
  }
});

app.post("/cocurricular", async (req, res) => {
  try {
    const { email, higherStudies, becExamGrade, becExamStatus, educationGap, skillCertifications, languagesKnown, sportsQuota } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const updateData = {
      higherStudies,
      becExamGrade,
      becExamStatus,
      educationGap,
      skillCertifications,
      languagesKnown,
      sportsQuota,
    };

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, upsert: true } // Creates a new document if none exists
    );

    return res.status(200).json({
      message: "Co-Curricular data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating Co-Curricular data:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
