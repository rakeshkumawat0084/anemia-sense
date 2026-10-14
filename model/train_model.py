import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Ensure output directory exists
model_dir = os.path.dirname(os.path.abspath(__file__))
os.makedirs(model_dir, exist_ok=True)
model_path = os.path.join(model_dir, 'anemia_model.pkl')

print("Starting AnemiaSense Machine Learning Training Pipeline...")

# Set random seed for reproducibility
np.random.seed(42)
n_samples = 2500

# Feature distributions based on clinical hematology ranges:
# Hemoglobin (g/dL): typically 6.0 - 18.0
# RBC Count (m/mcL or million/uL): typically 2.5 - 6.5
# Hematocrit (%): typically 18.0 - 52.0
hemoglobin = np.random.uniform(6.0, 17.5, n_samples)
rbc_count = np.random.uniform(2.5, 6.2, n_samples)
hematocrit = np.random.uniform(19.0, 52.0, n_samples)

# Clinical diagnostic ground truth simulation (WHO guidelines + hematological correlations)
# Hemoglobin < 12.0 g/dL or Hematocrit < 36.0% strongly indicates anemia.
# In addition, RBC count < 3.8 correlates with impaired erythropoiesis.
target_prob = np.where(
    (hemoglobin < 11.5) | (hematocrit < 34.0),
    0.95,
    np.where(
        (hemoglobin < 12.5) | (hematocrit < 37.0),
        0.75,
        np.where(
            (hemoglobin < 13.0) & (rbc_count < 4.0),
            0.55,
            0.05
        )
    )
)

# Binary labels with realistic clinical noise
target = (np.random.rand(n_samples) < target_prob).astype(int)

data = pd.DataFrame({
    'hemoglobin': hemoglobin,
    'rbc_count': rbc_count,
    'hematocrit': hematocrit,
    'target': target
})

X = data[['hemoglobin', 'rbc_count', 'hematocrit']]
y = data['target']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train ML Random Forest Classifier
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=8,
    random_state=42
)
model.fit(X_train, y_train)

# Evaluate model performance
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Model Trained Successfully. Test Accuracy: {acc * 100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Save the trained model artifact
joblib.dump(model, model_path)
print(f"Model saved successfully to: {model_path}")
