import React from "react";
import { motion } from "framer-motion";

const prompts = [
  { title: "Summarize PDF", desc: "Upload and get a summary" },
  { title: "Debug Code", desc: "Explain and fix errors" },
  { title: "Generate Blog Ideas", desc: "AI-powered content ideas" },
];

const PromptLibrary = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Prompt Library</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {prompts.map((p, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-800 rounded-2xl p-6 text-center cursor-pointer"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xl font-bold">{p.title}</div>
            <div className="text-gray-400 mt-2">{p.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;