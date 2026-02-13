import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Brain, Rocket } from "lucide-react";

const ModelSelector = ({ selectedModel, onModelChange }) => {
  const models = [
    {
      id: "llama3-8b-8192",
      name: "Llama 3 (8B)",
      description: "Fast & efficient for everyday tasks",
      icon: <Brain size={20} />,
      speed: "Fast",
      intelligence: "Good",
      color: "#667eea"
    },
    {
      id: "llama3-70b-8192",
      name: "Llama 3 (70B)",
      description: "Most powerful for complex reasoning",
      icon: <Cpu size={20} />,
      speed: "Medium",
      intelligence: "Excellent",
      color: "#764ba2"
    },
    {
      id: "mixtral-8x7b-32768",
      name: "Mixtral 8x7B",
      description: "Expert-level reasoning capabilities",
      icon: <Rocket size={20} />,
      speed: "Fast",
      intelligence: "Excellent",
      color: "#f59e0b"
    },
    {
      id: "gemma-7b-it",
      name: "Gemma 7B",
      description: "Lightweight but capable",
      icon: <Zap size={20} />,
      speed: "Very Fast",
      intelligence: "Good",
      color: "#10b981"
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>AI Models</h3>
        <p style={styles.subtitle}>Choose your preferred AI companion</p>
      </div>
      
      <div style={styles.modelsGrid}>
        {models.map((model) => (
          <motion.button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            style={{
              ...styles.modelCard,
              borderColor: selectedModel === model.id ? model.color : "transparent",
              background: selectedModel === model.id 
                ? `rgba(${parseInt(model.color.slice(1,3), 16)}, ${parseInt(model.color.slice(3,5), 16)}, ${parseInt(model.color.slice(5,7), 16)}, 0.1)`
                : "rgba(255,255,255,0.05)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={styles.modelHeader}>
              <div style={{ ...styles.modelIcon, color: model.color }}>
                {model.icon}
              </div>
              <div style={styles.modelInfo}>
                <h4 style={styles.modelName}>{model.name}</h4>
                <p style={styles.modelDesc}>{model.description}</p>
              </div>
            </div>
            
            <div style={styles.modelStats}>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Speed:</span>
                <span style={{ ...styles.statValue, color: model.color }}>{model.speed}</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Intelligence:</span>
                <span style={{ ...styles.statValue, color: model.color }}>{model.intelligence}</span>
              </div>
            </div>
            
            {selectedModel === model.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.selectedBadge}
              >
                ✓ Selected
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      <div style={styles.infoBox}>
        <div style={styles.infoIcon}>💡</div>
        <p style={styles.infoText}>
          Changing models may affect response time and quality. Llama 3 (70B) is recommended for complex tasks.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    border: "1px solid rgba(255,255,255,0.1)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "14px",
    margin: 0,
  },
  modelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  modelCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "15px",
    padding: "20px",
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
    position: "relative",
    overflow: "hidden",
  },
  modelHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "20px",
  },
  modelIcon: {
    flexShrink: 0,
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.1)",
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 5px 0",
    color: "white",
  },
  modelDesc: {
    fontSize: "13px",
    color: "#aaa",
    margin: 0,
    lineHeight: "1.5",
  },
  modelStats: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    background: "rgba(0,0,0,0.2)",
    borderRadius: "10px",
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: "12px",
    color: "#888",
    display: "block",
    marginBottom: "5px",
  },
  statValue: {
    fontSize: "14px",
    fontWeight: "600",
  },
  selectedBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "5px 12px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "600",
  },
  infoBox: {
    display: "flex",
    gap: "15px",
    padding: "20px",
    background: "rgba(59, 130, 246, 0.1)",
    borderRadius: "15px",
    border: "1px solid rgba(59, 130, 246, 0.3)",
  },
  infoIcon: {
    fontSize: "20px",
    flexShrink: 0,
  },
  infoText: {
    fontSize: "14px",
    color: "#ccc",
    margin: 0,
    lineHeight: "1.6",
  },
};

export default ModelSelector;