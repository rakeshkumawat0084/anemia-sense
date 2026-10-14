# AnemiaSense - AI Powered Anemia Risk Assessment System

![AnemiaSense Banner](https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80)

**AnemiaSense** is an intelligent healthcare solution designed to assist healthcare professionals, clinical labs, and individuals in early detection, risk grading, and nutritional management of anemia using Machine Learning and Hematological Analytics.

---

## 🌟 Key Features

- **Machine Learning Classification**: Trained Random Forest model analyzing key Complete Blood Count (CBC) parameters:
  - **Hemoglobin (Hb)** (g/dL)
  - **Red Blood Cell (RBC) Count** (million / mcL)
  - **Hematocrit (HCT / PCV)** (%)
- **Instant Health Scoring & Confidence**: Real-time risk probability output with confidence rating.
- **Severity Stratification**: Aligned with World Health Organization (WHO) clinical thresholds (Normal, Mild, Moderate, Severe).
- **Dietary & Clinical Recommendations**: Evidence-based nutrition plans (heme & non-heme iron sources, absorption enhancers, and foods to avoid).
- **RESTful API**: Ready-to-integrate `/api/predict` endpoint for web, mobile, and EHR integrations.
- **Responsive Web Interface**: Clean, accessible clinical UI built with modern web standards.

---

## 📁 Repository Structure

```
anemia-sense/
├── app.py                  # Flask web server and prediction API
├── requirements.txt        # Python dependency manifest
├── README.md               # Documentation & submission guide
├── .gitignore              # Ignored cache, models & environments
├── templates/
│   └── index.html          # Web frontend template
└── model/
    └── train_model.py      # Random Forest ML training pipeline
```

---

## 🔬 Tech Stack

- **Language**: Python 3.9+
- **Backend Framework**: Flask 3.0 / Gunicorn
- **Machine Learning**: Scikit-Learn (RandomForestClassifier), NumPy, Pandas, Joblib
- **Frontend**: HTML5, Modern CSS, Responsive Design

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/anemia-sense.git
cd anemia-sense
```

### 2. Set up virtual environment
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Train the ML Model (Optional if pre-trained)
```bash
python model/train_model.py
```

### 5. Run the Application
```bash
python app.py
```
Visit `http://127.0.0.1:5000` in your web browser.

---

## 🌐 API Reference

### Predict Endpoint

**POST** `/api/predict`

**Request Body (JSON):**
```json
{
  "hemoglobin": 10.5,
  "rbc_count": 3.8,
  "hematocrit": 32.0
}
```

**Response (JSON):**
```json
{
  "success": true,
  "prediction": 1,
  "result": "Anemia Detected",
  "confidence": 94.25,
  "probabilities": {
    "normal": 5.75,
    "anemia": 94.25
  },
  "inputs": {
    "hemoglobin": 10.5,
    "rbc_count": 3.8,
    "hematocrit": 32.0
  }
}
```

---

## 📋 Steps to Submit on Skill Wallet Portal

1. **GitHub Par Push Karein:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AnemiaSense ML Web System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/anemia-sense.git
   git push -u origin main
   ```
2. **Deploy Karein (Demo Link ke liye):**
   - Option A: Host on [Render.com](https://render.com) (Create Web Service -> Connect GitHub repo -> Build: `pip install -r requirements.txt` -> Start: `gunicorn app:app`).
   - Option B: Host on [Vercel](https://vercel.com) or [Railway](https://railway.app).
   - Option C: Submit the live Cloud Run AI Studio preview link.
3. **Portal Par Submit Karein:**
   - **Add Github Link**: Repository ka URL paste karein.
   - **Add Demo Link**: Live deployment URL paste karein.

---

## ⚖️ Medical Disclaimer
*AnemiaSense is designed as an educational and screening support tool. It does not replace definitive medical evaluation by a licensed healthcare physician or complete laboratory diagnosis (such as Serum Ferritin, Peripheral Blood Smear, or Bone Marrow Biopsy).*
