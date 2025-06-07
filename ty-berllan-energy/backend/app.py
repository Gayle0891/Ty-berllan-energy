// File: backend/app.py
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="frontend/dist")
CORS(app)

@app.route("/api/overview")
def get_energy_data():
    return jsonify({
        "battery_percentage": 76,
        "solar_generation": 4.2,
        "grid_import": 1.8,
        "home_consumption": 3.5,
        "eddi_heating": True
    })

@app.route("/api/weather")
def get_weather():
    location = request.args.get("location", "NP18 2")
    return jsonify({
        "description": "Partly Cloudy",
        "temp": 17.6,
        "wind_speed": 3.9
    })

@app.route("/")
@app.route("/<path:path>")
def serve_frontend(path=""):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
