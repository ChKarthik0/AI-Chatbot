# chat_routes.py
import os
import requests
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required  # if you use JWT for login

chat_bp = Blueprint("chat", __name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat"


@chat_bp.route("/chat", methods=["POST"])
@jwt_required(optional=True)  # allow only logged-in users if required
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message")
        model = data.get("model", "llama3-8b-8192")

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": "You are NovaAI, a helpful assistant."},
                {"role": "user", "content": user_message},
            ],
            "max_tokens": 500,
            "temperature": 0.7,
        }

        groq_res = requests.post(GROQ_API_URL, headers=headers, json=payload)

        if groq_res.status_code != 200:
            return jsonify({"error": groq_res.text}), groq_res.status_code

        data = groq_res.json()
        reply = data.get("choices", [{}])[0].get("message", {}).get("content", "No response.")

        return jsonify({"reply": reply})

    except Exception as e:
        print("Groq API Error:", e)
        return jsonify({"error": "⚠ Server error connecting to Groq API"}), 500
