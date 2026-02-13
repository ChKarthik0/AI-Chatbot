// src/pages/Models.js
import React from "react";

const Models = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Available Models</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li>GPT-4 / GPT-5 (OpenAI)</li>
      <li>Claude (Anthropic)</li>
      <li>LLaMA 3 (Groq)</li>
      <li>Mixtral 8x7B (Groq)</li>
      <li>Gemma 7B (Google)</li>
    </ul>
  </div>
);

export default Models;
