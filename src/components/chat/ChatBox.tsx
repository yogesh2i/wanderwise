'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react'

export default function ChatBox() {
  const [msg, setMsg] = useState('');
  const [thinking, setThinking] = useState(false);
  const [chats, setChats] = useState([{
    role: "model",
    parts: [{ text: "Hello! I am your travel planner" }]
  }]);
  const chatHistoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chats, thinking]);


  async function submitMsg(e?: FormEvent) {
    if (e) e.preventDefault();
    const userMessage = {
      role: 'user',
      parts: [{ text: msg }],
    };
    setChats((prevChats) => [...prevChats, userMessage]);

    // Clear the input field
    setMsg('');
    setThinking(true);
    try {
      // Send the user's message and chat history to the backend
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: chats }),
      });

      const r = await res.json();

      // Add the AI's response to the chat
      const botMessage = {
        role: 'model',
        parts: [{ text: r?.reply }],
      };
      setThinking(false);
      setChats((prevChats) => [...prevChats, botMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  }



  return (
    <>
      <div id="chat-history" ref={chatHistoryRef} className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth">
        {chats && chats.map((chat, index) => {
          if (chat.role === "model") {
            return (
              <div className="flex justify-start" key={index}>
                <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg max-w-md shadow-sm">
                  {chat.parts[0].text}
                </div>
              </div>
            )
          } else {
            return (
              <div className="flex justify-end" key={index}>
                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-md shadow-sm">
                  {chat.parts[0].text}
                </div>
              </div>
            )
          }
        })}
        {thinking && <div className="flex justify-start">
          <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg max-w-md shadow-sm animate-pulse">
            Thinking...
          </div>
        </div>}

      </div>

      <form onSubmit={submitMsg}>
        <div className="p-4 border-t border-gray-200 flex items-center bg-white rounded-b-lg">
          <input type="text" id="chat-input" className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-4" placeholder="Type your message..." value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out" >
            Send
          </button>
        </div>
      </form>

    </>
  )
}
