"use client";

import { useState } from 'react';
import { ChatBox } from './ChatBox';
import { Bot, Leaf } from 'lucide-react';

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Floating Button */}
      <div
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-110">
            <div className="relative">
              <Bot className="text-white w-7 h-7" />
              <Leaf className="text-green-200 w-4 h-4 absolute -top-1 -right-1" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            🌱
          </div>
        </div>
        {!open && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with Sprout - Your Eco Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>

      {/* Chat Box Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-5 duration-300">
          <ChatBox onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
