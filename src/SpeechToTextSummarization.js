import React, { useState } from 'react';
import axios from 'axios';
import './SpeechToTextSummarization.css'; // Import your CSS file for styling

const SpeechToTextSummarization = () => {
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputType, setInputType] = useState('audio');

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

      let apiUrl;
      let formData = new FormData();
      if (inputType === 'audio' || inputType === 'video') {
        apiUrl = 'https://speech.googleapis.com/v1p1beta1/speech:recognize?key=YOUR_GOOGLE_CLOUD_API_KEY';
        formData.append('file', file);
      } else if (inputType === 'image') {
        apiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=YOUR_GOOGLE_CLOUD_API_KEY';
        formData.append('requests', JSON.stringify({
          image: {
            content: file,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        }));
      } else {
        setErrorMessage('Unsupported input type.');
        setLoading(false);
        return;
      }

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

      if (inputType === 'audio' || inputType === 'video') {
        const transcript = response.data.results[0].alternatives[0].transcript;
        setTranscription(transcript);
      } else if (inputType === 'image') {
        const textAnnotations = response.data.responses[0].textAnnotations;
        const text = textAnnotations && textAnnotations.length > 0 ? textAnnotations[0].description : '';
        setTranscription(text);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error transcribing and summarizing:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Input to Text Conversion</h2>
      <div className="instructions">
        <p>
            <strong> Select the type of input, upload a file, and we'll transcribe it
            and provide a summary.</strong>
        </p>
      </div>

      <div className="input-container">
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
        <input type="file" accept={inputType === 'image' ? 'image/*' : 'audio/*, video/*'} onChange={handleFileChange} />
        <button onClick={transcribeAndSummarize} disabled={loading}>
          {loading ? 'Transcribing...' : 'Transcribe'}
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    <div className="result-container">
        <div className="transcription">
         <h3>Transcription:</h3>
            <textarea rows="10" cols="180" value={transcription} readOnly placeholder="  Waiting for transcription..."/>
        </div>
    </div>
    <div className="summary-button">
        <button>Summarize</button>
    </div>
    <div className="summarization">
        <h3>Summary:</h3>
        <textarea rows="10" cols="180" value={summary} readOnly placeholder="  Generating summary..."/>
    </div>
    <div className="button-container">
    <div className="quiz-button">
        <button>Generate Quiz</button>
        <button>Generate Notes</button>
    </div>
    </div>
    <div className="quizOrNotes">
        <h3>Study Material:</h3>
        <textarea rows="10" cols="180" value={summary} readOnly placeholder="  Generating study material..."/>
    </div>

    <div className="print">
        <button>Print</button>
    </div>

    </div>
  );
};

export default SpeechToTextSummarization;
