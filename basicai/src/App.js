import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ChatPages from "./pages/ChatPages";
import Login from "./pages/Login";
import PromptLibrary from "./pages/PromptLibrary";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Settings from "./pages/Settings";
import SignupPage from "./pages/SignUp";
import Profile from "./pages/Profile";
import TermsPage from "./pages/TermsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookiesPage from "./pages/CookiesPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPages />} />
        <Route path="/promptlibrary" element={<PromptLibrary />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookie" element={<CookiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
