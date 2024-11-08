# app.py
import io
import scipy.io
from flask import Flask, request, jsonify, render_template
import torch
import numpy as np
from run import EEG_CNN

app = Flask(__name__)

# Define model parameters
sfreq = 128
model_path = 'models/model_ckpt.pth'

# Initialize and load the model
model = EEG_CNN(32, 1)
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()

def run_inference(model, data):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    data = data.to(device)
    data = data.reshape(-1, 32, 64, 50)
    
    with torch.no_grad():
        predictions = model(data)
    
    return predictions.cpu().numpy()

def load_single_eeg_file(file_data, data_key='Clean_data', sfreq=sfreq):
    dataset = []
    try:
        # Use io.BytesIO to wrap the bytes data as a file-like object
        mat_contents = scipy.io.loadmat(io.BytesIO(file_data))
        data = mat_contents[data_key]  # Assuming data is stored under 'Clean_data'
        data = np.array(data)  # Convert to NumPy array if not already
        dataset.append(data)
    except Exception as e:
        print(f"Failed to load EEG data: {e}")
        return None
    
    # Split data into epochs and flatten
    dataset = np.array(dataset)
    n_trials, n_channels, n_samples = dataset.shape
    n_epochs = n_samples // sfreq
    epoched_data = dataset.reshape(n_trials, n_channels, n_epochs, sfreq)
    flattened_data = epoched_data.reshape(epoched_data.shape[0], -1)
    
    return torch.FloatTensor(flattened_data)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        # Read file as bytes
        file_data = file.read()
        
        # Pass the bytes data to load_single_eeg_file
        data = load_single_eeg_file(file_data)
        if data is None:
            return jsonify({"error": "Failed to process EEG data"}), 500

        predictions = run_inference(model, data)
        return jsonify({"predictions": predictions.tolist()})

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
