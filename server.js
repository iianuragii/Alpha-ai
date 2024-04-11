const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const { runChat } = require('./modules/runChat');

app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello');
})

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

app.listen(port, () => {
    console.log(`Server is Running at at PORT ${port}`);
});
