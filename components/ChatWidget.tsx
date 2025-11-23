import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Musthak's AI Assistant. Ask me anything about his skills, projects, or automation experience!", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await sendMessageToGemini(messages.map(m => ({ role: m.role, text: m.text })), userMsg.text);
    
    const aiMsg: ChatMessage = { role: 'model', text: aiResponseText || "Sorry, I didn't catch that.", timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden flex flex-col transition-all animate-float">
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-neon-purple/20 rounded-lg">
                <Bot size={20} className="text-neon-purple" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Portfolio AI Agent</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Powered by Gemini
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-900/95" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-neon-purple text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                 </div>
               </div>
            )}
          </div>

          <div className="p-3 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my projects..."
                className="flex-1 bg-slate-900 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-purple border border-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-neon-purple hover:bg-purple-600 text-white p-2 rounded-xl disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask AI Agent"
        className="group flex items-center gap-2 bg-white text-slate-900 p-4 rounded-full shadow-lg hover:shadow-neon-purple/50 transition-all hover:scale-105"
      >
        {!isOpen && <span className="hidden md:block font-semibold pr-2">Ask AI Agent</span>}
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="text-neon-purple animate-pulse" />}
      </button>
    </div>
  );
};

export default ChatWidget;