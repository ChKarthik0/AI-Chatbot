import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/nova.jpg";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // --- Validation ---
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value ? "" : "Name required";
      case "email":
        if (!value) return "Email required";
        else if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
        else return "";
      case "password":
        if (!value) return "Password required";
        if (value.length < 6) return "Min 6 characters";
        return "";
      default:
        return "";
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      return "strong";
    else if (password.length >= 6) return "medium";
    else return "weak";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });
    setErrors({ ...errors, [name]: validateField(name, val) });
    if (name === "password")
      setPasswordStrength(evaluatePasswordStrength(value));
  };

  // --- Submit Signup ---
const handleSubmit = async (e) => {
  e.preventDefault();
  setServerError("");

  // validate before sending
  const newErrors = {};
  Object.keys(form).forEach((k) => {
    const err = validateField(k, form[k]);
    if (err) newErrors[k] = err;
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    setLoading(true);

    const res = await axios.post("http://127.0.0.1:5000/auth/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: false, // if you don’t use cookies
    });

    setLoading(false);

    // ✅ Handle success
    if (res.status === 201 || res.status === 200) {
      alert("✅ Signup successful! Please login.");
      navigate("/login");
    }
  } catch (err) {
    setLoading(false);

    if (err.response) {
      // Server responded with error
      setServerError(err.response.data?.error || "Signup failed");
    } else if (err.request) {
      // No response from server (CORS / network issue)
      setServerError("⚠ Could not reach server. Check backend & CORS.");
    } else {
      // Other errors
      setServerError("⚠ Unexpected error occurred.");
    }

    console.error("Signup error:", err);
  }
};

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div className="card" style={{ display: "flex", width: "900px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: "12px", overflow: "hidden" }}>
        <Navbar />
        {/* Left side */}
        <div className="card-left" style={{ flex: 1, background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", color: "#fff", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "100px", marginBottom: "20px" }} />
          <h2>Join NovaAI!</h2>
          <p>Create your account to access amazing AI features.</p>
        </div>

        {/* Right side */}
        <div className="card-right" style={{ flex: 1.2, padding: "40px", background: "#1e1e2f", color: "#fff" }}>
          <button className="back-btn" style={{ marginBottom: "20px", background: "transparent", border: "1px solid #666", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", color: "#fff" }} onClick={() => navigate("/")}>
            Back
          </button>

          <form onSubmit={handleSubmit}>
            {/* Social login buttons */}
            <div className="social-btns" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <button type="button" className="social-btn google" style={{ flex: 1, margin: "0 5px", background: "#db4437", border: "none", padding: "10px", color: "#fff", borderRadius: "6px", cursor: "pointer" }}>Google</button>
              <button type="button" className="social-btn github" style={{ flex: 1, margin: "0 5px", background: "#24292f", border: "none", padding: "10px", color: "#fff", borderRadius: "6px", cursor: "pointer" }}>GitHub</button>
              <button type="button" className="social-btn microsoft" style={{ flex: 1, margin: "0 5px", background: "#0078d4", border: "none", padding: "10px", color: "#fff", borderRadius: "6px", cursor: "pointer" }}>Microsoft</button>
            </div>

            {/* Input fields */}
            <div className="input-group" style={{ marginBottom: "15px" }}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a3d", color: "#fff" }}/>
              {errors.name && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
            </div>

            <div className="input-group" style={{ marginBottom: "15px" }}>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a3d", color: "#fff" }}/>
              {errors.email && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
            </div>

            <div className="input-group" style={{ marginBottom: "15px", position: "relative" }}>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a3d", color: "#fff" }}/>
              <span className="show-hide" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#aaa" }}>
                {showPassword ? "Hide" : "Show"}
              </span>
              {errors.password && <span className="error" style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
              {passwordStrength && (
                <div style={{ fontSize: "12px", marginTop: "5px", color: passwordStrength === "strong" ? "lime" : passwordStrength === "medium" ? "orange" : "red" }}>
                  Strength: {passwordStrength}
                </div>
              )}
            </div>

            <div className="checkbox-group" style={{ marginBottom: "20px" }}>
              <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} /> Remember Me
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: "#6a11cb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {serverError && <div style={{ marginTop: "10px", color: "red", fontSize: "14px" }}>{serverError}</div>}

          <div className="bottom-links" style={{ marginTop: "20px" }}>
            Already have an account? <a href="/login" style={{ color: "#6a11cb" }}>Login</a>
          </div>

          <div className="terms" style={{ marginTop: "20px", fontSize: "12px", color: "#bbb" }}>
            By signing up, you agree to our <a href="#" style={{ color: "#6a11cb" }}>Terms</a> and <a href="#" style={{ color: "#6a11cb" }}>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;