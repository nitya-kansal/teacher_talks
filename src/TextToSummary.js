import React, { useState } from 'react';
//import axios from 'axios';
import './TextToSummary.css'; // Import your CSS file for styling

const TextToSummary = () => {
  const [notes] = useState('');
    /*
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
  */

  return (
    <div className="container">
      <div className="top_bar">
        <h2>Text to Notes</h2>
      </div>

      <div className="instructions">
        <p>
            <strong>Welcome to the Text to Notes Summarization tool! Select a button to begin!</strong>
        </p>
      </div>

      <div className="result-container">
        <div className="notes">
          <h3>Notes:</h3>
        </div>
      </div>

      <table>
        <tr>
        
        <td> 
        <div className="text_File">
          <iframe src="test.pdf" height="1200" width="600" title="Notes:"></iframe>
        </div>
        </td>

        <td>
        <div className="side_buttons">
          <div className="back_Button">
            <button><h4>Back</h4></button>
          </div>
          <div className="done_Button">
            <button><h4>Done</h4></button>
          </div>      
        </div>
        </td>

        </tr>
    </table>

    </div>
  );
};

export default TextToSummary;
