import React from 'react'
import ChatBox from '@/components/chat/ChatBox';
export default function page() {
  return (
    <section id="chat-page" className="page-section w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Your Personal AI Travel Assistant</h2>
      <p className="text-center text-gray-600 mb-8">Ask me anything about your trip, packing, local culture, and more!</p>

      <div className="flex flex-col h-[600px] border border-gray-200 rounded-lg shadow-inner bg-gray-50">
        <ChatBox />

      </div>

    </section>
  )
}
