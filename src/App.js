import './App.css';
import SpeechToTextSummarization from './SpeechToTextSummarization';
import Login from './Login';
import React, { useState } from 'react';


function App() {

  const [loginSucess, setLoginSucess] = useState(false);
  const onSuccessHandlerParent = () => {
    setLoginSucess(true);
  }

  return (
    <div className="App">
     {!loginSucess && <Login successHandler ={onSuccessHandlerParent}/>}
      {loginSucess && <SpeechToTextSummarization />}
    </div>
  );
}

export default App;

