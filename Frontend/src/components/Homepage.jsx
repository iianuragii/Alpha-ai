import React, { useState } from 'react'
import '../styles/chat.css';

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
    <div>
      <div id="chat-container">
        <h1>Welcome to Anu.ai, an Alpha-AI initiative.</h1>
        <div id="chat-history">
          {chatHistory.map((entry, index) => (
            <div key={index} className={entry.type + '-message'}>{entry.message}</div>
          ))}
        </div>
        <form id="chat-form" onSubmit={sendMessage}>
          <input
            type="text"
            id="user-input"
            placeholder="Enter your message"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
        </form>
      </div>
      {loading && (
        <div id="loader" className="loader">
          <img src="loader.gif" width="150px" alt="Loading..." />
        </div>
      )}
    </div>
  );
}

export default Homepage;
