const API_BASE = "http://localhost:5000/api";

export const getChatResponse = async (userInput, model) => {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // if using JWT
      },  
      body: JSON.stringify({ message: userInput, model }),
    });

    if (!res.ok) {
      const errTxt = await res.text();
      throw new Error(`HTTP ${res.status} - ${errTxt}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error("Frontend error:", err.message);
    return "⚠ Error fetching response.";
  }
};
