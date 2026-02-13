import React, { useState, useEffect, useRef } from "react";
import { Paperclip, Search, BookOpen, Mic, Send } from "lucide-react";
import FloatingMenu from "./FloatingMenu";

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
      // Simulate API call
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          text: `This is a simulated response to: "${userMessage.text}". In a real implementation, this would come from your AI API. The response can be quite long to demonstrate the scrolling behavior when there are many messages in the chat conversation.`, 
          sender: "bot" 
        }]);
        setIsTyping(false);
      }, 1000);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠ Error fetching response", sender: "bot" },
      ]);
      setIsTyping(false);
    }
  };

  // Add some sample messages for testing
  const addSampleMessages = () => {
    const sampleMessages = [
      { text: "Hello! How can I help you today?", sender: "bot" },
      { text: "I need help with React components", sender: "user" },
      { text: "Sure! React components are the building blocks of React applications. They let you split the UI into independent, reusable pieces. There are two types: functional components and class components.", sender: "bot" },
      { text: "Can you explain props?", sender: "user" },
      { text: "Props (short for properties) are read-only inputs to a component. They allow you to pass data from parent to child components. Props are immutable and help make components reusable.", sender: "bot" },
      { text: "What about state?", sender: "user" },
      { text: "State is data that changes over time, usually in response to user actions. Unlike props, state is managed within the component. In functional components, you use the useState hook to manage state.", sender: "bot" },
      { text: "That's helpful! What's the difference between props and state?", sender: "user" },
      { text: "Props are passed to the component (similar to function parameters) whereas state is managed within the component (similar to variables declared within a function). Props are read-only, while state can be updated using setState or useState setter function.", sender: "bot" },
      { text: "Can you give me an example?", sender: "user" },
      { text: "Sure! Here's a simple example:\n\n```jsx\nfunction Greeting(props) {\n  const [name, setName] = useState('John');\n  \n  return (\n    <div>\n      <h1>Hello, {props.greeting} {name}!</h1>\n      <button onClick={() => setName('Jane')}>\n        Change Name\n      </button>\n    </div>\n  );\n}\n\n// Usage:\n<Greeting greeting=\"Welcome\" />\n```\n\nHere, `greeting` is a prop and `name` is a state variable.", sender: "bot" },
    ];
    setMessages(sampleMessages);
  };

  return (
    <div style={styles.chatBoxContainer}>
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
          
          {/* Optional: Button to add sample messages for testing */}
          <button 
            onClick={addSampleMessages}
            style={{...styles.btn, marginTop: '20px', background: 'rgba(0,123,255,0.3)'}}
          >
            Load Sample Conversation
          </button>
        </div>
      ) : (
        // Chat interface
        <>
          {/* Messages area - will scroll with page */}
          <div style={styles.messagesArea}>
            <div style={styles.messages}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.message,
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, rgba(0,123,255,0.7), rgba(0,86,179,0.7))"
                        : "rgba(255,255,255,0.1)",
                    marginRight: msg.sender === "user" ? "20px" : "0",
                    marginLeft: msg.sender === "bot" ? "20px" : "0",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ 
                  ...styles.message, 
                  alignSelf: "flex-start",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}>
                  <div style={styles.typingIndicator}>
                    <div style={styles.dot}></div>
                    <div style={styles.dot}></div>
                    <div style={styles.dot}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </>
      )}
      
      {/* Fixed input bar at bottom - Always visible when there are messages */}
      {messages.length > 0 && (
        <div style={styles.bottomBar}>
          <form onSubmit={handleSend} style={styles.formBottom}>
            <input
              type="text"
              placeholder="Message NovaAI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.inputChat}
              autoFocus
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
      )}
    </div>
  );
};

// Updated Styles - SIMPLIFIED for page scrolling
const styles = {
  chatBoxContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "inherit",
    color: "white",
    position: "relative",
    minHeight: "calc(100vh - 180px)",
  },
  centeredView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    padding: "20px",
    minHeight: "calc(100vh - 180px)",
  },
  title: { 
    fontSize: "32px", 
    fontWeight: "bold", 
    marginBottom: "5px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: { 
    color: "#aaa", 
    marginBottom: "30px",
    fontSize: "16px",
  },
  formCentered: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "16px",
    backdropFilter: "blur(10px)",
  },
  inputChat: {
    width: "100%",
    maxWidth: "800px",
    padding: "14px 50px 14px 20px",
    borderRadius: "30px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "16px",
    backdropFilter: "blur(10px)",
  },
  sendBtn: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "8px",
  },
  sendBtnBottom: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "8px",
  },
  optionsCentered: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  // Messages area - NO internal scroll
  messagesArea: {
    width: "100%",
    padding: "20px",
    marginBottom: "180px", // Space for fixed input bar
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  message: {
    maxWidth: "75%",
    padding: "12px 18px",
    borderRadius: "20px",
    fontSize: "15px",
    wordBreak: "break-word",
    lineHeight: "1.5",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  // Fixed bottom bar
  bottomBar: {
    padding: "15px 20px",
    background: "rgba(11, 11, 11, 0.95)", // More opaque
    borderTop: "1px solid rgba(255,255,255,0.1)",
    position: "fixed",
    bottom: "60px", // Position above footer
    left: "0",
    right: "0",
    zIndex: 1000,
    backdropFilter: "blur(15px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formBottom: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    maxWidth: "800px",
    width: "100%",
    margin: "0 auto 10px auto",
  },
  optionsBottom: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "25px",
    fontSize: "14px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  typingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 0",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.7)",
    animation: "typing 1.4s infinite ease-in-out",
  },
};

// Add CSS for typing animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(styleSheet);

export default ChatBox;