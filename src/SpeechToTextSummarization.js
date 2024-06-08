import React, { useState } from 'react';
import axios from 'axios';
import './SpeechToTextSummarization.css'; // Import your CSS file for styling

const SpeechToTextSummarization = () => {
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setErrorMessage('');
  };

  const transcribeAndSummarize = async () => {
    try {
      if (!file) {
        setErrorMessage('Please select a file.');
        return;
      }

      setLoading(true);

      const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
      const apiUrl = `https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${apiKey}`;

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          config: JSON.stringify({
            encoding: 'LINEAR16',
            languageCode: 'en-US',
          }),
        },
      });

      const transcript = response.data.results[0].alternatives[0].transcript;
      setTranscription(transcript);

      // Implement summarization logic here
      // For this example, just set the summary to the transcription
      setSummary(transcript);

      setLoading(false);
    } catch (error) {
      console.error('Error transcribing and summarizing:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Speech to Text Summarization</h2>
      <div className="instructions">
        <p>
            <strong>Welcome to the Speech to Text Summarization tool. Upload an audio or video file, and we'll transcribe it
            and provide a summary.</strong>
        </p>
      </div>
      <div className="input-container">
        <input type="file" accept="audio/*, video/*" onChange={handleFileChange} />
        <button onClick={transcribeAndSummarize} disabled={loading}>
          {loading ? 'Transcribing...' : 'Transcribe and Summarize'}
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="result-container">
        <div className="transcription">
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
        <div className="summary">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default SpeechToTextSummarization;
