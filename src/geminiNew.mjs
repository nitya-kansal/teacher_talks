import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
 
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
 
const generate = async () => {
  try {
    // Read image file
    const filePath = "pyth.jpeg";
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString("base64");
 
    const promptConfig = [
      { text: "find x and tell me how u got it" },
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
  } catch (error) {
    console.log(" response error", error);
  }
};
 
generate();