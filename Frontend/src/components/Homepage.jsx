import React, { useState } from 'react';
import Navbar from './Navbar';
import { Button, Grid, Input } from '@mui/material';

function Homepage() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setChatHistory(prevHistory => [...prevHistory, { type: 'user', message: userInput }, { type: 'bot', message: botMessage }]);
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Grid>
        <Navbar/>
      </Grid>
      <Grid
        sx={{
          fontFamily: 'sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '95vh',
          backgroundColor: '#053245',
        }}
      >
        <Grid
          id="chat-container"
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            width: '400px',
          }}
        >
          <h1 sx={{ textAlign: 'center', marginBottom: '20px', color: '#053245' }}>
            Tell me How Can I help you today?? 
          </h1>
          <Grid
            id="chat-history"
            sx={{ height: '300px', overflowY: 'scroll' }}
          >
            {chatHistory.map((entry, index) => (
              <Grid key={index} className={entry.type + '-message'}>{entry.message}</Grid>
            ))}
          </Grid>
          <form id="chat-form" onSubmit={sendMessage} sx={{ display: 'flex' }}>
            <Input
              type="text"
              id="user-input"
              placeholder="Enter your message"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              sx={{
                flexGrow: '1',
                marginRight: '10px',
                padding: '10px',
                width:'70%',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: '#0e88bd',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </Grid>
        {loading && (
          <Grid id="loader" className="loader" sx={{ display: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <img src="loader.gif" width="150px" alt="Loading..." />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Homepage;
