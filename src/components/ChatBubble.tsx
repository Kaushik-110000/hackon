interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'bot';
}

export function ChatBubble({ message, sender }: ChatBubbleProps) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
          isUser
            ? 'bg-green-600 text-white rounded-br-none'
            : 'bg-gray-100 text-black rounded-bl-none'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
