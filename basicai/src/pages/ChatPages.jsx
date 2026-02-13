import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Paperclip, Search, BookOpen, Mic, Send } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getChatResponse } from "../api/chatModel";
import { useNavigate } from "react-router-dom";

const ChatPages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Send message
  // --- inside handleSend ---
const handleSend = async (e) => {
  e?.preventDefault();
  if (!input.trim()) return;

  const userMessage = { role: "user", text: input };
  setMessages((prev) => [...prev, userMessage]); // add once
  setInput("");
  setLoading(true);

  try {
    const botResponse = await getChatResponse(userMessage.text, model);

    let currentText = "";
    for (let i = 0; i < botResponse.length; i++) {
      currentText += botResponse[i];
      setMessages((prev) => {
        // replace last AI message OR add new one
        const msgs = [...prev];
        if (msgs[msgs.length - 1]?.role === "ai") {
          msgs[msgs.length - 1].text = currentText;
        } else {
          msgs.push({ role: "ai", text: currentText });
        }
        return msgs;
      });
      await new Promise((res) => setTimeout(res, 20));
    }
  } catch (err) {
    setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Error fetching response" }]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80 }}
          style={styles.sidebar}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
            Recent Chats
          </h2>
          <button
            onClick={() => setMessages([])}
            style={styles.newChatBtn}
          >
            + New Chat
          </button>

          <div style={{ flex: 1, overflowY: "auto" }}>
            <div style={styles.recentItem}>Chat with AI 🤖</div>
          </div>

          <div>
            <button onClick={() => navigate("/settings")} style={styles.sidebarBtn}>⚙️ Settings</button>
            <button onClick={() => navigate("/profile")} style={styles.sidebarBtn}>👤 Profile</button>
            <button style={styles.logoutBtn}>🚪 Logout</button>
          </div>
        </motion.div>
      )}

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={styles.topbar}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.menuBtn}
          >
            ☰
          </button>
          <h2 style={{ fontWeight: "bold" }}>NovaAI</h2>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={styles.modelSelect}
          >
            <option value="llama3-8b-8192">Groq Llama3 (8B)</option>
            <option value="llama3-70b-8192">Groq Llama3 (70B)</option>
            <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
            <option value="gemma-7b-it">Gemma 7B</option>
          </select>
        </div>

        {/* Landing Screen */}
        {messages.length === 0 ? (
          <div style={styles.centeredView}>
            <h1 style={styles.title}>NovaAI</h1>
            <p style={styles.subtitle}>Ask anything</p>

            <form onSubmit={handleSend} style={styles.formCentered}>
              <input
                type="text"
                placeholder="Message NovaAI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.inputLanding}
              />
              <button type="submit" style={styles.sendBtnLanding}>
                <Send size={18} />
              </button>
            </form>

            <div style={styles.optionsRow}>
              <button style={styles.optionBtn}><Paperclip size={18}/> Attach</button>
              <button style={styles.optionBtn}><Search size={18}/> Search</button>
              <button style={styles.optionBtn}><BookOpen size={18}/> Study</button>
              <button style={styles.optionBtn}><Mic size={18}/> Voice</button>
            </div>
          </div>
        ) : (
          // Chat Screen
          <div style={styles.chatView}>
            <div style={styles.messages}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    ...styles.message,
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    background:
                      msg.role === "user"
                        ? "rgba(0,123,255,0.6)"
                        : "rgba(255,255,255,0.1)",
                  }}
                >
                  {msg.text.includes("```") ? (
                    <SyntaxHighlighter language="javascript" style={materialDark} wrapLongLines>
                      {msg.text.replace(/```/g, "")}
                    </SyntaxHighlighter>
                  ) : (
                    msg.text
                  )}
                </motion.div>
              ))}
              {loading && (
                <div style={{ ...styles.message, alignSelf: "flex-start" }}>
                  NovaAI is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input */}
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
              <div style={styles.optionsRow}>
                <button style={styles.optionBtn}><Paperclip size={18}/> Attach</button>
                <button style={styles.optionBtn}><Search size={18}/> Search</button>
                <button style={styles.optionBtn}><BookOpen size={18}/> Study</button>
                <button style={styles.optionBtn}><Mic size={18}/> Voice</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  page: { display: "flex", height: "100vh", backgroundColor: "#0d0d0d", color: "white" },

  // Sidebar
  sidebar: {
    width: "260px",
    backgroundColor: "#1a1a1a",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #333",
  },
  newChatBtn: {
    backgroundColor: "#4f46e5",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
  },
  recentItem: {
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    backgroundColor: "#2a2a2a",
    cursor: "pointer",
  },
  sidebarBtn: {
    width: "100%",
    backgroundColor: "#2a2a2a",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  logoutBtn: {
    width: "100%",
    backgroundColor: "#ef4444",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  // Top bar
  topbar: {
    backgroundColor: "#1a1a1a",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  menuBtn: { background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" },
  modelSelect: {
    backgroundColor: "#2a2a2a",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
  },

  // Landing
  centeredView: { margin: "auto", textAlign: "center", maxWidth: "600px" },
  title: { fontSize: "32px", fontWeight: "bold", marginBottom: "5px" },
  subtitle: { color: "#aaa", marginBottom: "20px" },
  formCentered: { position: "relative", display: "flex", justifyContent: "center", marginBottom: "15px" },
  inputLanding: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
  },
  sendBtnLanding: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  // Chat
  chatView: { flex: 1, display: "flex", flexDirection: "column" },
  messages: { flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" },
  message: { maxWidth: "65%", padding: "10px 15px", borderRadius: "15px", fontSize: "14px", backdropFilter: "blur(4px)" },

  // Bottom input
  bottomBar: { borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 20px", background: "rgba(0,0,0,0.3)" },
  formBottom: { position: "relative", display: "flex", justifyContent: "center", marginBottom: "10px", alignItems:"center", gap:"10px" },
  inputChat: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "14px",
    width: "40%",
  },
  sendBtnBottom: {
    position: "absolute",
    right: "30%",
    top: "29%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  // Options row
  optionsRow: { display: "flex", gap: "10px", justifyContent: "center" },
  optionBtn: {
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

export default ChatPages;
