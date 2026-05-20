import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';

const KNOWLEDGE_BASE = {
  greetings: {
    keywords: ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening", "goodnight"],
    response: "Hello! 👋 I am Anil's AI assistant. I can tell you about his skills, experience, projects, or how to contact him. What would you like to know?"
  },
  skills: {
    keywords: ["skill", "skills", "technologies", "stack", "frontend", "backend", "languages", "tech", "react", "next", "python", "fastapi", "frappe", "erpnext"],
    response: "Anil is a highly capable Full-Stack Engineer! 💻 His core stack includes:\n\n• Frontend: React.js, Next.js, JavaScript (ES6+), HTML5, CSS3\n• Backend: Python, FastAPI, Frappe Framework, ERPNext development\n• AI: Generative AI, prompt engineering\n\nHe is equally comfortable building sleek, modern user interfaces and engineering high-performance APIs!"
  },
  experience: {
    keywords: ["experience", "work", "job", "current", "hybrowlabs", "ssde", "role", "years", "physics wallah", "pw"],
    response: "Anil has over 2 years of professional experience! 💼\n\nCurrently, he works as an SSDE (Software Support & Development Engineer) at Hybrowlabs Technologies. He is actively contributing to enterprise-level HRMS and Recruitment Management Systems for Physics Wallah (PW), developing features for employee management and recruitment workflows."
  },
  projects: {
    keywords: ["projects", "portfolio", "contributions", "holiday trip", "lbf", "iskcon", "works", "what did he build"],
    response: "Anil has contributed to several notable projects across diverse domains! 🚀\n\n• HRMS & Recruitment (Physics Wallah): Scaling workflows, employee modules, and user interfaces.\n• Holiday Trip: Comprehensive booking and travel management.\n• LBF Logistica: High-efficiency logistics and dashboard workflows.\n• ISKCON Temple: Specialized workflow management systems."
  },
  education: {
    keywords: ["education", "college", "university", "degree", "btech", "b.tech", "cse", "invertis"],
    response: "Anil completed his Bachelor of Technology (B.Tech) in Computer Science Engineering from Invertis University in 2023! 🎓 He has been focused on enterprise development and full-stack engineering since."
  },
  contact: {
    keywords: ["contact", "email", "hire", "phone", "reach", "linkedin", "github", "social"],
    response: "You can easily connect with Anil! ✉️\n\n• Email: Open the Contact form at the bottom of the page!\n• GitHub: github.com/04anilr\n• LinkedIn: linkedin.com/in/anil-rajput-71172a245/\n\nFeel free to leave a message in the Contact section, and he will get back to you promptly!"
  },
  hud: {
    keywords: ["hud", "telemetry", "companion", "what is this green button"],
    response: "Ah, the HUD! 🟢 It's a persistent Telemetry Companion showing active session uptime, link latency, and your Skills Assessment verification status in real-time. Give the quiz a try!"
  }
};

const SUGGESTIONS = [
  "What are your core skills?",
  "Tell me about your experience",
  "Show me your projects",
  "How can I contact you?"
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I am Anil's AI Assistant. Ask me anything about his skills, experience, or custom projects!",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Trigger bot typing
    setIsTyping(true);

    setTimeout(() => {
      // Find AI response
      const botResponseText = getAIResponse(text);
      const botMsg = { id: Date.now() + 1, text: botResponseText, isBot: true };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 850);
  };

  const getAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase().trim();
    
    for (const category in KNOWLEDGE_BASE) {
      const matched = KNOWLEDGE_BASE[category].keywords.some(keyword => query.includes(keyword));
      if (matched) {
        return KNOWLEDGE_BASE[category].response;
      }
    }

    return "I'm not sure about that one, but I'd love to tell you more! 🤖\n\nTry asking me about:\n• His core skills & stack\n• His 2+ years of experience at Hybrowlabs\n• His active contributions for Physics Wallah\n• Notable projects like Holiday Trip\n• How to contact/hire him";
  };

  return (
    <div className={`portfolio-chatbot ${isOpen ? 'chatbot--open' : 'chatbot--closed'}`}>
      {/* Collapsed floating trigger badge button */}
      {!isOpen ? (
        <button className="chatbot__trigger-btn" onClick={() => setIsOpen(true)} title="Chat with AI Assistant">
          <i className="uil uil-comment-message"></i>
          <span className="chatbot__notification-dot"></span>
        </button>
      ) : (
        <div className="chatbot__window">
          {/* Header */}
          <div className="chatbot__header">
            <div className="chatbot__header-profile">
              <div className="chatbot__header-avatar">
                <i className="uil uil-robot"></i>
                <span className="avatar-online-dot"></span>
              </div>
              <div className="chatbot__header-meta">
                <h4 className="chatbot__header-title">Anil's AI Companion</h4>
                <span className="chatbot__header-subtitle">Online & Ready</span>
              </div>
            </div>
            <button className="chatbot__close-btn" onClick={() => setIsOpen(false)}>
              <i className="uil uil-multiply"></i>
            </button>
          </div>

          {/* Conversation Body */}
          <div className="chatbot__body">
            <div className="chatbot__messages-container">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.isBot ? 'bot-message' : 'user-message'}`}>
                  {msg.isBot && (
                    <div className="bot-msg-avatar">
                      <i className="uil uil-android"></i>
                    </div>
                  )}
                  <div className="chat-message__bubble">
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-message bot-message typing-indicator-msg">
                  <div className="bot-msg-avatar">
                    <i className="uil uil-android"></i>
                  </div>
                  <div className="chat-message__bubble typing-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Suggestions */}
            <div className="chatbot__suggestions">
              {SUGGESTIONS.map((sug, idx) => (
                <button 
                  key={idx} 
                  className="chatbot__suggestion-chip"
                  onClick={() => handleSendMessage(sug)}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="chatbot__footer">
            <input 
              type="text" 
              className="chatbot__input" 
              placeholder="Ask me a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(inputValue);
              }}
            />
            <button className="chatbot__send-btn" onClick={() => handleSendMessage(inputValue)}>
              <i className="uil uil-navigator"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbot;
