import os
import scipy.io
import matplotlib.pyplot as plt
from flask import Flask, render_template, request
from io import BytesIO
import base64

app = Flask(__name__)

# Route for home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle file upload and plot EEG data
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    # Read file data into memory
    file_data = file.read()

    # Generate plot and convert to base64
    plot_image = generate_plot(file_data)

    return render_template('index.html', plot_image=plot_image)

# Function to generate plot from MAT file and return image as base64
def generate_plot(file_data):
    # Load the .mat file from memory
    mat_data = scipy.io.loadmat(BytesIO(file_data))

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

    # Save the plot to a BytesIO object (in memory)
    img_stream = BytesIO()
    plt.tight_layout()
    plt.savefig(img_stream, format='png')
    img_stream.seek(0)
    plt.close()

    # Convert image to base64
    img_base64 = base64.b64encode(img_stream.getvalue()).decode('utf-8')

    return img_base64

if __name__ == '__main__':
    app.run(debug=True)
