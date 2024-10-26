const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const port = 5500;
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(cors());
app.use(express.json());

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `As an expert in finance and money management, answer the user's question: ${userInput} , send me a clean response only text no symbols like * this`;
    
    // Ensure prompt is wrapped correctly
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error.response?.data || error.message || error);
    throw error;
  }
}


app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('Incoming /chat request:', userInput);
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
