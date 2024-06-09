
function visionToText(imageFilePath) {

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    //const { dotenv } = require("dotenv")

    //dotenv.config();
    require('dotenv').config();

    //const gemini_api_key = process.env.API_KEY;
    const googleAI = new GoogleGenerativeAI("AIzaSyDPi0XoRJMxOgnrHhWU4OgiQu2MOtPjhHg");
    const geminiConfig = {
    temperature: 0.4,
    topP: 1,
    topK: 32,
    maxOutputTokens: 4096,
    };
    
    const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro-vision",
    geminiConfig,
    });
    generate(imageFilePath, geminiModel);

};


const generate = async (imageFilePath, geminiModel) => {
  try {
    const fs = require("fs/promises");
    // Read image file
    

    const imageFile = await fs.readFile(imageFilePath);
    const imageBase64 = imageFile.toString("base64");
 
    const promptConfig = [
      { text: "explain to me whats on screen" },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
    ];
 
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });
    const response = await result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.log(" response error", error);
  }
};

function speechToText(pathToAudioFile) {

  const { Leopard } = require("@picovoice/leopard-node");
  const accessKey = "nY9GJz9JbNi2KbmJ/VxrmDwoOPk/XKDi8LE45lFPGYpSlL6t03ZlsA==";
  let leopard = new Leopard(accessKey);
  const result = leopard.processFile('harvard.wav');
  console.log(result.transcript);
  };


module.exports = { visionToText, speechToText};