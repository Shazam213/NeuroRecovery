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


import torch
import scipy.io
import numpy as np
import time

# Define the larger window size to match [1, 32, 3200] which reshapes to [1, 32, 64, 50]
large_window_size = 3200  # in samples

# Load EEG data in larger windows for real-time simulation
def load_large_window_eeg(filepath, data_key='Clean_data'):
    # Load the full dataset from the .mat file
    dataset = []
    mat_contents = scipy.io.loadmat(filepath)
    data = mat_contents[data_key]
    dataset.append(data)
    data = np.array(dataset)
    
    n_trials, n_channels, n_samples = data.shape

    # Calculate the number of large windows
    n_large_windows = n_samples // large_window_size

    # Yield each large window to simulate real-time inference
    for i in range(n_large_windows):
        # Extract the current large window and reshape to model's expected input format
        large_window_data = data[:, :, i*large_window_size:(i+1)*large_window_size]
        large_window_tensor = torch.FloatTensor(large_window_data).reshape(-1, 32, 64, 50)
        
        yield large_window_tensor

# Real-time inference function with larger windows
def run_large_window_realtime_inference(model, filepath):
    # Initialize device and set model to evaluation mode
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    model.eval()
    
    # Process data in large windows
    for large_window_data in load_large_window_eeg(filepath):
        # Move large window data to device
        large_window_data = large_window_data.to(device)
        
        with torch.no_grad():
            # Run inference on the current large window
            predictions = model(large_window_data)
        
        # Convert to numpy for processing and print
        print("Predictions for current large window:", predictions.cpu().numpy())
        
        # Simulate real-time delay (optional)
        time.sleep(1)  # Adjust delay to simulate real-time (e.g., 1 sec here)

# Example usage
model_path = 'models/model_ckpt.pth'
model = EEG_CNN(32, 1)  # Adjust to match your trained model configuration
model.load_state_dict(torch.load(model_path))

uploaded_file_path = 'test_dataset/Timed/Arithmetic_sub_12.mat'
run_large_window_realtime_inference(model, uploaded_file_path)
