from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required
from datetime import timedelta
from .models import db, User

auth_bp = Blueprint("auth", __name__)

# ------------------------
# Signup
# ------------------------
@auth_bp.route("/signup", methods=["GET", "POST"])
def signup():
    data = request.get_json()

    if not data or not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "All fields (name, email, password) are required"}), 400

    # Check if user exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 400

    try:
        new_user = User(
            name=data["name"],
            email=data["email"],
            password_hash=generate_password_hash(data["password"]),
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "Signup successful! Please login.",
            "user": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500


# ------------------------
# Login
# ------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create JWT token (valid for 1 day)
    access_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(days=1)
    )

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200


# ------------------------
# Protected Example
# ------------------------
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    return jsonify({"message": "This is a protected route!"}), 200