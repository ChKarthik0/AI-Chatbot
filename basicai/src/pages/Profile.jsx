import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #111, #000)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        👤 User Profile
      </h1>
      <div
        style={{
          background: "#1e1e1e",
          padding: "20px",
          borderRadius: "12px",
          width: "300px",
          textAlign: "left",
        }}
      >
        <p><b>Name:</b> {user?.name || "Guest"}</p>
        <p><b>Email:</b> {user?.email || "Not available"}</p>
      </div>
    </div>
  );
};

export default Profile;
    