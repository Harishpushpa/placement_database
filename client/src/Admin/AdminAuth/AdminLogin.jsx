import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/loginpage.css'
export default function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  const presentdata = sessionStorage.getItem('userData');

      useEffect(() => {
        sessionStorage.clear();
        console.log("Session storage cleared.");
        if(presentdata){
          window.location.reload();
        }
      }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:5000/adminlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('AdminData', JSON.stringify({ user: data.user }));
      console.log("User data stored:", data.user);
      navigate('/AdminDesktop');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button type="submit">Login</button>
      </form>

    </div>
  );
}
