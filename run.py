import torch
import scipy.io
import numpy as np

sfreq = 128

class EEG_CNN(torch.nn.Module):
    def __init__(self, num_channels, num_classes):
        super(EEG_CNN, self).__init__()

        self.conv1 = torch.nn.Conv2d(num_channels, 64, kernel_size=10, stride=1)
        self.relu1 = torch.nn.ReLU()
        self.pool1 = torch.nn.MaxPool2d(kernel_size=2, stride=2)

        self.conv2 = torch.nn.Conv2d(64, 128, kernel_size=10, stride=1)
        self.relu2 = torch.nn.ReLU()
        self.pool2 = torch.nn.MaxPool2d(kernel_size=2, stride=2)

        self.flat = torch.nn.Flatten()

        self.fc1 = torch.nn.Linear(5760, 128)
        self.dropout1 = torch.nn.Dropout(0.1)

        self.fc2 = torch.nn.Linear(128, 64)
        self.dropout2 = torch.nn.Dropout(0.1)

        self.fc3 = torch.nn.Linear(64, 64)
        self.dropout3 = torch.nn.Dropout(0.1)

        self.fc4 = torch.nn.Linear(64, num_classes)

        self.sigmoid = torch.nn.Sigmoid()


    def forward(self, x):
        x = self.pool1(self.relu1(self.conv1(x)))
        x = self.pool2(self.relu2(self.conv2(x)))
        x = self.flat(x)
        x = self.fc1(x)
        x = self.dropout1(x)
        x = self.fc2(x)
        x = self.dropout2(x)
        x = self.fc3(x)
        x = self.dropout3(x)
        x = self.fc4(x)
        x = self.sigmoid(x)
        return x

# Load and process individual EEG file
def load_single_eeg_file(filepath, data_key='Clean_data', sfreq=sfreq):
    dataset=[]
    try:
        mat_contents = scipy.io.loadmat(filepath)
        data = mat_contents[data_key]  # Assuming data is stored under 'Clean_data' for filtered data
        data = np.array(data)  # Convert to NumPy array if not already
        dataset.append(data)
    except Exception as e:
        print(f"Failed to load {filepath}: {e}")
        return None
    
    # Split data into epochs and flatten
    dataset = np.array(dataset)
    n_trials, n_channels, n_samples = dataset.shape
    n_epochs = n_samples // sfreq
    epoched_data = dataset.reshape(n_trials, n_channels, n_epochs, sfreq)
    flattened_data = epoched_data.reshape(epoched_data.shape[0], -1)
    
    return torch.FloatTensor(flattened_data)

# Inference function for a single EEG file
def run_inference(model, filepath):
    # Load the data
    data = load_single_eeg_file(filepath)
    if data is None:
        print("Error loading data for inference.")
        return
    
    # Ensure the model is in evaluation mode
    model.eval()
    
    # Move data to the device (e.g., CUDA if available)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    data = data.to(device)
    data = data.reshape(-1, 32, 64, 50)
    
    # Run inference and get predictions
    with torch.no_grad():
        predictions = model(data)
    
    # Process predictions if needed (e.g., convert to probabilities or class labels)
    return predictions.cpu().numpy()  # Return as a NumPy array for easy handling

if __name__ == '__main__':
    # Example usage
    model_path = 'models/model_ckpt.pth'
    model = EEG_CNN(32, 1)  # Adjust to match your trained model configuration
    model.load_state_dict(torch.load(model_path))

    # Filepath to the uploaded EEG data file
    uploaded_file_path = 'test_dataset/Single/Arithmetic_sub_12_trial3.mat'
    predictions = run_inference(model, uploaded_file_path)
    print("Predictions:", predictions)
