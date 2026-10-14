import os
import joblib
import numpy as np
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Model Path Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'model')
MODEL_PATH = os.path.join(MODEL_DIR, 'anemia_model.pkl')

import sys
import subprocess

def get_model():
    """Load model if exists, otherwise train on the fly."""
    if not os.path.exists(MODEL_PATH):
        print("Trained model not found. Generating model now...")
        train_script = os.path.join(MODEL_DIR, 'train_model.py')
        if os.path.exists(train_script):
            subprocess.run([sys.executable, train_script], check=True)
        else:
            raise FileNotFoundError(f"Training script not found at {train_script}")
    return joblib.load(MODEL_PATH)

try:
    model = get_model()
except Exception as e:
    print(f"Warning: Could not load initial model: {e}")
    model = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        hemoglobin = float(request.form.get('hemoglobin'))
        rbc_count = float(request.form.get('rbc_count'))
        hematocrit = float(request.form.get('hematocrit'))

        global model
        if model is None:
            model = get_model()

        features = np.array([[hemoglobin, rbc_count, hematocrit]])
        prediction = int(model.predict(features)[0])
        probabilities = model.predict_proba(features)[0]

        confidence = round(float(np.max(probabilities)) * 100, 2)
        is_anemia = (prediction == 1)
        result_text = "Positive: Anemia Detected" if is_anemia else "Negative: Normal Blood Profile"

        return render_template(
            'index.html',
            prediction_text=result_text,
            confidence_text=f"Model Confidence Score: {confidence}%",
            is_anemia=is_anemia,
            hemoglobin=hemoglobin,
            rbc_count=rbc_count,
            hematocrit=hematocrit
        )
    except Exception as e:
        return render_template('index.html', error=f"Error processing parameters: {str(e)}")

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """JSON API endpoint for programmatic or mobile app calls"""
    try:
        data = request.get_json(force=True)
        hemoglobin = float(data.get('hemoglobin'))
        rbc_count = float(data.get('rbc_count'))
        hematocrit = float(data.get('hematocrit'))

        global model
        if model is None:
            model = get_model()

        features = np.array([[hemoglobin, rbc_count, hematocrit]])
        prediction = int(model.predict(features)[0])
        probabilities = model.predict_proba(features)[0]

        return jsonify({
            'success': True,
            'prediction': prediction,
            'result': 'Anemia Detected' if prediction == 1 else 'Normal Health',
            'confidence': round(float(np.max(probabilities)) * 100, 2),
            'probabilities': {
                'normal': round(float(probabilities[0]) * 100, 2),
                'anemia': round(float(probabilities[1]) * 100, 2)
            },
            'inputs': {
                'hemoglobin': hemoglobin,
                'rbc_count': rbc_count,
                'hematocrit': hematocrit
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
