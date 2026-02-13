import React, { useState, useEffect, useRef } from "react";
import { Paperclip, Search, BookOpen, Mic, Send } from "lucide-react";
import Message from "./Message"; // single message bubble component
import { getChatResponse } from "../api/chatModel"; // your API call

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Send handler
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const botResponse = await getChatResponse(userMessage.text);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠ Error fetching response", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={styles.page}>
      {messages.length === 0 ? (
        // Landing screen
        <div style={styles.centeredView}>
          <h1 style={styles.title}>NovaAI</h1>
          <p style={styles.subtitle}>Ask anything</p>

          <form onSubmit={handleSend} style={styles.formCentered}>
            <input
              type="text"
              placeholder="Message NovaAI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.sendBtn}>
              <Send size={18} />
            </button>
          </form>

          <div style={styles.optionsCentered}>
            <button style={styles.btn}><Paperclip size={18}/> Attach</button>
            <button style={styles.btn}><Search size={18}/> Search</button>
            <button style={styles.btn}><BookOpen size={18}/> Study</button>
            <button style={styles.btn}><Mic size={18}/> Voice</button>
          </div>
        </div>
      ) : (
        // Chat interface
        <div style={styles.chatView}>
          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "user"
                      ? "rgba(0,123,255,0.6)"
                      : "rgba(255,255,255,0.1)",
                  marginRight: msg.sender === "user" ? "340px" : "0",
                  marginLeft: msg.sender === "bot" ? "340px" : "0",
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{ ...styles.message, alignSelf: "flex-start" }}>
                NovaAI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar after chat starts */}
          <div style={styles.bottomBar}>
            <form onSubmit={handleSend} style={styles.formBottom}>
              <input
                type="text"
                placeholder="Message NovaAI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.inputChat}
              />
              <button type="submit" style={styles.sendBtnBottom}>
                <Send size={18} />
              </button>
            </form>
            <div style={styles.optionsBottom}>
              <button type="button" style={styles.btn}><Paperclip size={18} /> Attach</button>
              <button type="button" style={styles.btn}><Search size={18} /> Search</button>
              <button type="button" style={styles.btn}><BookOpen size={18} /> Study</button>
              <button type="button" style={styles.btn}><Mic size={18} /> Voice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  page: {
    display: "flex",
    height: "100vh",
    width: "100%",
    backgroundColor: "inherit",
    color: "white",
  },
  centeredView: {
    margin: "auto",
    textAlign: "center",
    width: "100%",
    maxWidth: "600px",
  },
  title: { fontSize: "32px", fontWeight: "bold", marginBottom: "5px" },
  subtitle: { color: "#aaa", marginBottom: "20px" },
  formCentered: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
  },
  inputChat: {
    width: "40%",
    padding: "12px 16px",
    borderRadius: "30px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "transparent",
    color: "white",
    outline: "none",
    textAlign: "center",
    margin: "0 auto",
  },
  sendBtn: {
    position: "absolute",
    right: "10px",
    top: "35%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  sendBtnBottom: {
    position: "absolute",
    right: "450px",
    top: "35%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  optionsCentered: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  chatView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  messages: {
    flex: 1,
    padding: "20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflowY: "auto",
  },
  message: {
    maxWidth: "65%",
    padding: "10px 15px",
    borderRadius: "15px",
    fontSize: "14px",
  },
  bottomBar: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    padding: "20px",
    background: "rgba(0,0,0,0.3)",
  },
  formBottom: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  optionsBottom: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default ChatBox;