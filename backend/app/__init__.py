import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
from .models import db

def create_app():
    app = Flask(__name__)

    # Load environment variables
    load_dotenv()

    # Config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback_secret")

    # Init extensions
    db.init_app(app)
    JWTManager(app)
    # Allow frontend (React on port 3000) to talk to backend (Flask on port 5000)
    CORS(app, resources={r"/*": {"origins" : "http://localhost:3000"}})

    # Register blueprints
    from .auth_routes import auth_bp
    from .chat_routes import chat_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(chat_bp, url_prefix="/chat")

    # Create DB tables
    with app.app_context():
        db.create_all()

    # Default route
    @app.route("/")
    def index():
        return {"message": "Backend is running 🚀. Use /auth or /chat endpoints."}

    return app