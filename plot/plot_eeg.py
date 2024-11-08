import scipy.io
import matplotlib.pyplot as plt

# Load the .mat file
file_path = 'test_dataset/Timed/Arithmetic_sub_10.mat'
mat_data = scipy.io.loadmat(file_path)

# Access the EEG data from 'Clean_data'
eeg_data = mat_data['Clean_data']
num_channels, time_points = eeg_data.shape

# Set the number of channels to plot
num_channels_to_plot = 5  # Adjust this if you'd like to plot more channels

# Set up the figure for plotting each channel separately
plt.figure(figsize=(12, 3 * num_channels_to_plot))
time = range(time_points)

# Plot each channel on a separate subplot
for i in range(num_channels_to_plot):
    plt.subplot(num_channels_to_plot, 1, i + 1)
    plt.plot(time, eeg_data[i, :], label=f'Channel {i+1}', color='b')
    plt.xlabel('Time Points')
    plt.ylabel('Amplitude')
    plt.title(f'EEG Data Waveform - Channel {i+1}')
    plt.legend()

# Adjust layout to prevent overlap
plt.tight_layout()
plt.show()
