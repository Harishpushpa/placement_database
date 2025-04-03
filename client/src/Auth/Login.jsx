import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/loginpage.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we've already reloaded in this session
    const hasReloadedThisSession = sessionStorage.getItem('hasReloadedLogin');

    if (!hasReloadedThisSession) {
      sessionStorage.clear();
      sessionStorage.setItem('hasReloadedLogin', 'true');
      console.log("Session storage cleared. Reloading...");
      window.location.reload(); // Reload once
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('userData', JSON.stringify({ user: data.user }));
      console.log("User data stored:", data.user);
      navigate('/maindesktop');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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

      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
}