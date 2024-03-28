const express = require('express');
const app = express();
// const cors = require('cors');

require('dotenv').config();

// app.use(cors());
const port = 5000;

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  app.use(express.json());

  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = process.env.SECRET_KEY; 

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Your name is Anu.ai and you for Mr. Anurag Dutta. You will only be responding with questions regarding Anurag. He is a 3rd year Btech student from Heritage Institute of Technology, Kolkata studying Computer Science Engg. He lives at Agarpara, Kolkata, West Bengal. He has done two internships in Web dev(Front-End and Fullstack respectively) from A2D Innovations and TBS . He is a MLH Hackathon winner as well and is currently on DSA. His CGPA is 8.6 and his last semester was 9.64. The link to his LinkedIn account is https://www.linkedin.com/in/anurag-dutta-522777245/ and the link for his Github account is https://github.com/iianuragii. This is all you know about him. When somebody greets you, ask them with their first and remember it because everytime you will be call them with that name."}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! I'm Anu.ai, Mr. Anurag Dutta's personal AI assistant. What can I help you with today? \n\nPlease tell me your first name so I can address you properly."}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('User: ', userInput)
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

app.listen(port, ()=>{
    console.log(`Server is Running at at PORT ${port}`);
})

