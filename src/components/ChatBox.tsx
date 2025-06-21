"use client";

import { useEffect, useState, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { ProductCard } from "./ProductCard";
import { X, Send, Leaf, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

interface ProductInfo {
  productName: string;
  ecoScore: number;
  greenCoins: number;
  material: string;
  category: string;
  description: string;
  price: string | number;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  products?: ProductInfo[];
  timestamp: string; // Store as string for localStorage compatibility
  feedback?: "up" | "down" | null;
}

interface ChatBoxProps {
  onClose: () => void;
}

export function ChatBox({ onClose }: ChatBoxProps) {
  const defaultWelcome: Message = {
    sender: "bot",
    text: "🌿 Hi there! I'm Sprout, your eco-friendly shopping assistant. I'm here to help you find sustainable products and answer questions about green living. What can I help you with today?",
    timestamp: new Date().toISOString(),
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastProductQueryRef = useRef<string | null>(null);
  const offsetRef = useRef<number>(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sprout_chat_history");
      if (saved) {
        try {
          const parsed: Message[] = JSON.parse(saved);
          setMessages(parsed);
        } catch {
          setMessages([defaultWelcome]);
        }
      } else {
        setMessages([defaultWelcome]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem("sprout_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const userMessage: Message = {
      sender: "user",
      text: userInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const lower = userInput.toLowerCase();
    let isMoreRequest =
      lower.includes("more") &&
      messages.some((m) => m.sender === "bot" && m.products?.length);

    const query =
      isMoreRequest && lastProductQueryRef.current
        ? lastProductQueryRef.current
        : userInput;

    if (!isMoreRequest) {
      offsetRef.current = 0;
    } else {
      offsetRef.current += 5;
    }

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: query, offset: offsetRef.current }),
      });

      const data = await res.json();

      if (data.products?.length) {
        lastProductQueryRef.current = query;
      }

      const botMessage: Message = {
        sender: "bot",
        text:
          data.summary ||
          "🛠️ Sorry, I couldn't understand that. Please try again!",
        products: data.products || [],
        timestamp: new Date().toISOString(),
        feedback: null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "🌿 I'm here to help! There was a small issue, but I'm ready to assist you with eco-friendly products and green living tips.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (index: number, type: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, feedback: type } : msg))
    );
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-t-2xl shadow-2xl overflow-hidden border border-green-200 w-full h-full flex flex-col  max-h-[68vh]">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Leaf className="w-6 h-6" />
          <div>
            <h3 className="font-bold text-lg">Sprout</h3>
            <p className="text-green-100 text-sm">
              Your Eco Shopping Assistant
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/10 p-2 rounded-full transition"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto bg-gradient-to-b from-green-50/30 to-white">
        <div className="p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="space-y-2">
              <ChatBubble message={msg.text} sender={msg.sender} />
              {Array.isArray(msg.products) && msg.products.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.products.slice(0, 3).map((product, pidx) => (
                    <ProductCard key={pidx} product={product} />
                  ))}
                </div>
              )}
              {msg.sender === "bot" &&
                (msg.feedback === null || msg.feedback === undefined) && (
                  <div className="flex gap-2 items-center text-sm text-gray-600">
                    <span>Was this helpful?</span>
                    <button
                      onClick={() => handleFeedback(idx, "up")}
                      className="hover:text-green-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleFeedback(idx, "down")}
                      className="hover:text-red-600"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              {msg.feedback === "up" && (
                <p className="text-green-600 text-xs">Thanks for the 👍!</p>
              )}
              {msg.feedback === "down" && (
                <p className="text-red-500 text-xs">
                  Thanks for the feedback 👎
                </p>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 max-w-[75%]">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>
                  <span className="text-sm text-gray-600">
                    Sprout is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-green-100 bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              className="w-full border border-green-200 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
              type="text"
              placeholder="Ask about eco-friendly products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
          </div>
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
            type="button"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
