import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/nova.jpg";
import { Eye, EyeOff, Lock, Mail, ChevronLeft, Sparkles } from "lucide-react";

// Import components (assuming they're in the same directory)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !value
          ? "Email required"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Invalid email"
          : "";
      case "password":
        return !value
          ? "Password required"
          : value.length < 6
          ? "Min 6 characters"
          : "";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    
    // validate form
    const newErrors = {};
    Object.keys(form).forEach((k) => {
      const err = validateField(k, form[k]);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      setLoading(false);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setErrors({ general: err.response.data?.error || "Login failed" });
      } else if (err.request) {
        setErrors({ general: "⚠ Could not reach server (CORS or network issue)" });
      } else {
        setErrors({ general: "⚠ Unexpected error occurred" });
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background Animation */}
      <div style={styles.background}>
        <div style={{ ...styles.shape, ...styles.shape1 }} />
        <div style={{ ...styles.shape, ...styles.shape2 }} />
        <div style={{ ...styles.shape, ...styles.shape3 }} />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          {/* Hero/Image Section - Moves to top on mobile */}
          <div style={styles.heroSection}>
            <div style={styles.heroContent}>
              <div style={styles.logoContainer}>
                <Sparkles size={36} style={styles.logoIcon} />
                <h1 style={styles.heroTitle}>Nova<span style={styles.highlight}>AI</span></h1>
              </div>
              <p style={styles.heroSubtitle}>Login to your account and continue exploring intelligent conversations</p>
              <img 
                src={logo} 
                alt="NovaAI Logo" 
                style={styles.heroImage}
              />
            </div>
          </div>

          {/* Login Form Section */}
          <div style={styles.formSection}>
            <div style={styles.formCard}>
              {/* Back Button for Mobile */}
              <button 
                style={styles.backButtonMobile}
                onClick={() => navigate("/")}
              >
                <ChevronLeft size={20} />
                Back to Home
              </button>

              <div style={styles.formHeader}>
                <h2 style={styles.formTitle}>Welcome Back</h2>
                <p style={styles.formSubtitle}>Sign in to continue your journey with NovaAI</p>
              </div>

              {/* Social Login Buttons */}
              <div style={styles.socialButtons}>
                <button type="button" style={styles.socialButton}>
                  <svg style={styles.googleIcon} viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
                <button type="button" style={styles.socialButton}>
                  <svg style={styles.githubIcon} viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>

              <div style={styles.divider}>
                <span style={styles.dividerText}>or continue with email</span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} style={styles.form}>
                {errors.general && (
                  <div style={styles.errorAlert}>
                    {errors.general}
                  </div>
                )}

                {/* Email Input */}
                <div style={styles.inputGroup}>
                  <div style={styles.inputLabel}>
                    <Mail size={18} style={styles.inputIcon} />
                    <label>Email Address</label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                </div>

                {/* Password Input */}
                <div style={styles.inputGroup}>
                  <div style={styles.inputLabel}>
                    <Lock size={18} style={styles.inputIcon} />
                    <label>Password</label>
                  </div>
                  <div style={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      style={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={styles.passwordToggle}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span style={styles.errorText}>{errors.password}</span>}
                  
                  {/* Password Strength Indicator */}
                  {form.password && (
                    <div style={styles.passwordStrengthContainer}>
                      <div style={styles.passwordStrengthLabel}>
                        Password strength:
                        <span style={{
                          ...styles.strengthText,
                          color: passwordStrength === 'strong' ? '#10b981' : 
                                 passwordStrength === 'medium' ? '#f59e0b' : '#ef4444'
                        }}>
                          {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                        </span>
                      </div>
                      <div style={styles.passwordStrengthBar}>
                        <div style={{
                          ...styles.strengthFill,
                          width: passwordStrength === 'strong' ? '100%' : 
                                 passwordStrength === 'medium' ? '66%' : '33%',
                          background: passwordStrength === 'strong' ? '#10b981' : 
                                     passwordStrength === 'medium' ? '#f59e0b' : '#ef4444'
                        }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div style={styles.formOptions}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" style={styles.forgotPassword}>
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  style={loading ? styles.submitButtonLoading : styles.submitButton}
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      Logging in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div style={styles.signupLink}>
                Don't have an account?{" "}
                <Link to="/signup" style={styles.signupLinkText}>
                  Sign up for free
                </Link>
              </div>

              {/* Terms */}
              <div style={styles.terms}>
                By logging in, you agree to our{" "}
                <Link to="/terms" style={styles.termsLink}>Terms</Link> and{" "}
                <Link to="/privacy" style={styles.termsLink}>Privacy Policy</Link>.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Inline Styles
const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#0b0b0b",
    color: "white",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    overflowX: "hidden",
  },
  background: {
    position: "fixed",
    inset: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  shape: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.15,
    filter: "blur(120px)",
    animation: "float 15s ease-in-out infinite",
  },
  shape1: { 
    width: 400, 
    height: 400, 
    background: "#667eea", 
    top: "10%", 
    left: "5%", 
    animationDelay: "0s" 
  },
  shape2: { 
    width: 350, 
    height: 350, 
    background: "#764ba2", 
    top: "60%", 
    left: "80%", 
    animationDelay: "5s" 
  },
  shape3: { 
    width: 300, 
    height: 300, 
    background: "#4c51bf", 
    top: "30%", 
    left: "85%", 
    animationDelay: "10s" 
  },
  main: {
    position: "relative",
    zIndex: 5,
    paddingTop: "80px", // Account for fixed navbar
    paddingBottom: "40px",
    minHeight: "calc(100vh - 200px)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    minHeight: "calc(100vh - 200px)",
  },
  // Hero/Image Section
  heroSection: {
    flex: 1,
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroContent: {
    textAlign: "center",
    maxWidth: "500px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  logoIcon: {
    color: "#667eea",
    animation: "sparkle 2s ease-in-out infinite",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  highlight: {
    color: "#764ba2",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#aaa",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  heroImage: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
    animation: "float 6s ease-in-out infinite",
  },
  // Form Section
  formSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  formCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "450px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
  backButtonMobile: {
    display: "none",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "all 0.3s ease",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  formTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  formSubtitle: {
    color: "#aaa",
    fontSize: "1rem",
    margin: 0,
  },
  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
  },
  githubIcon: {
    width: "20px",
    height: "20px",
    fill: "white",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "25px 0",
  },
  dividerText: {
    display: "inline-block",
    padding: "0 15px",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#888",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  errorAlert: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  inputLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#aaa",
  },
  inputIcon: {
    color: "#667eea",
  },
  input: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
    padding: "5px",
  },
  errorText: {
    color: "#ef4444",
    fontSize: "13px",
  },
  passwordStrengthContainer: {
    marginTop: "10px",
  },
  passwordStrengthLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#888",
    marginBottom: "5px",
  },
  strengthText: {
    fontWeight: "600",
  },
  passwordStrengthBar: {
    height: "4px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "2px",
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
    transition: "all 0.3s ease",
  },
  formOptions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#aaa",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#667eea",
  },
  forgotPassword: {
    color: "#667eea",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  submitButton: {
    padding: "16px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  submitButtonLoading: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(102, 126, 234, 0.5)",
    color: "white",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  signupLink: {
    textAlign: "center",
    marginTop: "25px",
    color: "#aaa",
    fontSize: "15px",
  },
  signupLinkText: {
    color: "#667eea",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "5px",
  },
  terms: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "13px",
    color: "#888",
    lineHeight: "1.5",
  },
  termsLink: {
    color: "#667eea",
    textDecoration: "none",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Hover effects */
  .social-button:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  .input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
  
  .submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  .forgot-password:hover {
    color: #764ba2;
  }
  
  .signup-link-text:hover {
    text-decoration: underline;
  }
  
  .terms-link:hover {
    text-decoration: underline;
  }
  
  .back-button-mobile:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .container {
      flex-direction: column-reverse !important;
    }
    
    .hero-section {
      padding: 20px !important;
      order: 1 !important;
    }
    
    .form-section {
      padding: 20px !important;
      order: 2 !important;
    }
    
    .back-button-mobile {
      display: flex !important;
    }
    
    .hero-title {
      font-size: 2.5rem !important;
    }
    
    .hero-subtitle {
      font-size: 1rem !important;
      margin-bottom: 20px !important;
    }
    
    .hero-image {
      max-width: 300px !important;
    }
    
    .form-card {
      padding: 25px !important;
    }
    
    .form-title {
      font-size: 1.8rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 10px !important;
    }
    
    .hero-title {
      font-size: 2rem !important;
    }
    
    .hero-image {
      max-width: 250px !important;
    }
    
    .social-buttons {
      flex-direction: column !important;
    }
    
    .form-options {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 15px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Login;