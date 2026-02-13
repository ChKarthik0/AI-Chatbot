import React from "react";

const Message = ({ role, content }) => {
  return (
    <div
      style={{
        margin: "10px 0",
        padding: "10px 15px",
        borderRadius: "12px",
        maxWidth: "70%",
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        background: role === "user" ? "purple" : "rgba(255,255,255,0.1)",
        color: "white",
      }}
    >
      {content}
    </div>
  );
};

export default Message;