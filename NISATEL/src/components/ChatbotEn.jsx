import { useState, useEffect, useRef, useCallback } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaQuoteRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const chatbotConfig = {
  welcomeMessage: "Hello! I'm NISATEL's virtual assistant. How can I help you?",
  services: {
    description: "NISATEL offers several services:",
    items: [
      "Custom design and technical study adapted to each specification (CCTP)",
      "In-house manufacturing of products in Témara",
      "National installation or international deployment upon request",
      "Inspection, maintenance and post-disaster expertise on all types of structures",
      "Professional WIFI network deployment and high-speed fiber optic infrastructure installation",
      "Implementation of marking systems and standardized lightning protection systems"
    ],
    buttons: [
      { text: "Request a quote", value: "service_quote", icon: <FaQuoteRight /> },
      { text: "Back", value: "menu" }
    ],
    keywords: ["services", "service", "offer", "offerings", "what do you offer", "what services"]
  },
  products: {
    categories: {
      pylones: {
        title: "Towers and Structures",
        items: [
          "Self-supporting lattice towers",
          "Monotube towers",
          "Special towers (guyed, foldable)",
          "Reinforcement of existing towers",
        ],
        keywords: ["tower", "towers", "structure", "structures", "reinforcement of towers"]
      },
      SolutionsTechniques: {
        title: "Technical Solutions",
        items: [
          "Professional WiFi",
          "Lightning protection system",
          "Beaconing system",
          "Air conditioning",
        ],
        keywords: ["technical", "wifi", "lightning", "beacon", "air conditioning", "technical solutions"]
      },
      wireless: {
        title: "Wireless and fiber optic solutions",
        items: [
          "Optical cables",
          "ODF",
          "Optical jumpers and splitters",
          "Connection cabinets",
          "Fiber optic test equipment"
        ],
        keywords: ["fiber optic", "fo equipment", "fo material", "optical cable", "wireless"]
      },
    },
    defaultButtons: [
      { text: "Back to categories", value: "products" },
      { text: "Main menu", value: "menu" },
      { text: "Request a quote", value: "service_quote", icon: <FaQuoteRight /> },
    ],
    keywords: ["range", "catalog", "what do you sell", "what products"]
  },

  contact: {
    phone: "0537410257",
    email: "contact@nisatel.ma",
    address: "06, Résidence Kader, Témara",
    keywords: ["contact", "get in touch", "email", "mail", "phone", "number", "address", "where are you", "location"]
  }
};

const ChatbotEn = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isOpen: false,
    messages: [],
    inputValue: '',
    currentView: 'menu',
    isTyping: false
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addMessage = (text, sender, options = {}) => {
    const newMessage = { text, sender, ...options };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const simulateTyping = useCallback((callback) => {
    setState(prev => ({ ...prev, isTyping: true }));
    setTimeout(() => {
      callback();
      setState(prev => ({ ...prev, isTyping: false }));
    }, 800);
  }, []);

  const containsKeywords = (input, keywords) => {
    return keywords.some(keyword => 
      input.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleResponse = useCallback((userInput) => {
    const input = userInput.toLowerCase().trim();

    if (input === "menu") {
      simulateTyping(() => {
        addMessage(chatbotConfig.welcomeMessage, 'bot', {
          buttons: [
            { text: "Our services", value: "services" },
            { text: "Our products", value: "products" },
            { text: "Contact", value: "contact" }
          ]
        });
        setState(prev => ({ ...prev, currentView: 'menu' }));
      });
      return;
    }

    if (input === "services" || containsKeywords(input, chatbotConfig.services.keywords)) {
      simulateTyping(() => {
        addMessage(chatbotConfig.services.description, 'bot', {
          listItems: chatbotConfig.services.items,
          buttons: chatbotConfig.services.buttons
        });
        setState(prev => ({ ...prev, currentView: 'services' }));
      });
      return;
    }

    if (input === "products" || containsKeywords(input, chatbotConfig.products.keywords)) {
      simulateTyping(() => {
        const categories = Object.values(chatbotConfig.products.categories).map(cat => ({
          text: cat.title,
          value: `product_category_${cat.title.toLowerCase().replace(/\s+/g, '_')}`
        }));
        
        addMessage("Our product categories:", 'bot', {
          buttons: [
            ...categories,
            { text: "Back", value: "menu" }
          ]
        });
        setState(prev => ({ ...prev, currentView: 'products' }));
      });
      return;
    }

    for (const [key, category] of Object.entries(chatbotConfig.products.categories)) {
      if (containsKeywords(input, category.keywords)) {
        simulateTyping(() => {
          addMessage(category.title, 'bot', {
            listItems: category.items,
            buttons: chatbotConfig.products.defaultButtons
          });
          setState(prev => ({ ...prev, currentView: 'product_category' }));
        });
        return;
      }
    }

    if (input.startsWith("product_category_")) {
      simulateTyping(() => {
        const categoryKey = input.replace("product_category_", "");
        const category = Object.entries(chatbotConfig.products.categories)
          .find(([key, val]) => val.title.toLowerCase().replace(/\s+/g, '_') === categoryKey)?.[1];
        
        if (category) {
          addMessage(category.title, 'bot', {
            listItems: category.items,
            buttons: chatbotConfig.products.defaultButtons
          });
          setState(prev => ({ ...prev, currentView: 'product_category' }));
        } else {
          addMessage("Unknown category. Please choose a valid category.", 'bot', {
            buttons: [
              { text: "Back to categories", value: "products" },
              { text: "Main menu", value: "menu" }
            ]
          });
        }
      });
      return;
    }

    if (input === "contact" || containsKeywords(input, chatbotConfig.contact.keywords)) {
      simulateTyping(() => {
        addMessage("NISATEL contact information:", 'bot', {
          contactInfo: true,
          buttons: [
            { text: "Back", value: "menu" }
          ]
        });
        setState(prev => ({ ...prev, currentView: 'contact' }));
      });
      return;
    }

    if (
      input.includes("number") || input.includes("phone") || input.includes("tel") || /call\w*/i.test(input) || input.includes("reach") || input.includes("contact")) {
      simulateTyping(() => {
        addMessage(`You can reach us at ${chatbotConfig.contact.phone}`, 'bot', {
          buttons: [
            { text: "Call the phone", value: `call_${chatbotConfig.contact.phone}` },
            { text: "Other question", value: "menu" }
          ]
        });
      });
      return;
    }

    if (input.includes("email") || input.includes("mail")) {
      simulateTyping(() => {
        addMessage(`Our email address is ${chatbotConfig.contact.email}`, 'bot', {
          buttons: [
            { text: "Send an email", value: `email_${chatbotConfig.contact.email}` },
            { text: "Other question", value: "menu" }
          ]
        });
      });
      return;
    }

    if (input.includes("address") || input.includes("location") || input.includes("where") || input.includes("find")) {
      simulateTyping(() => {
        addMessage(`We are located at ${chatbotConfig.contact.address}`, 'bot', {
          buttons: [
            { text: "View on map", value: "open_map" },
            { text: "Other question", value: "menu" }
          ]
        });
      });
      return;
    }

    simulateTyping(() => {
      addMessage("Can you clarify your request? I can tell you about our services, products, or give you our contact information.", 'bot', {
        buttons: [
          { text: "Our services", value: "services" },
          { text: "Our products", value: "products" },
          { text: "Contact", value: "contact" },
          { text: "Main menu", value: "menu" }
        ]
      });
    });
  }, [simulateTyping]);

  const handleUserAction = useCallback((value, buttonText) => {
    if (!value.trim()) return;
    
    addMessage(buttonText || value, 'user');
    setState(prev => ({ ...prev, inputValue: '' }));
    
    if (value === "service_quote") {
      setState(prev => ({ ...prev, isOpen: false }));
      navigate('/contact');
      return;
    }
    
    if (value.startsWith("call_")) {
      const phoneNumber = value.replace("call_", "");
      window.location.href = `tel:${phoneNumber}`;
      return;
    }
    
    if (value.startsWith("email_")) {
      const email = value.replace("email_", "");
      window.location.href = `mailto:${email}`;
      return;
    }
    
    if (value === "open_map") {
      simulateTyping(() => {
        addMessage(`Here is our location: ${chatbotConfig.contact.address} - You can find it on Google Maps`, 'bot', {
          buttons: [
            { text: "Open Google Maps", value: `maps_${encodeURIComponent(chatbotConfig.contact.address)}` },
            { text: "Other question", value: "menu" }
          ]
        });
      });
      return;
    }
    
    if (value.startsWith("maps_")) {
      const address = value.replace("maps_", "");
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
      return;
    }
    
    setTimeout(() => handleResponse(value), 300);
  }, [handleResponse, navigate, simulateTyping]);

  useEffect(() => {
    if (state.isOpen && state.messages.length === 0) {
      simulateTyping(() => handleResponse("menu"));
    }
  }, [state.isOpen, handleResponse, simulateTyping]);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, scrollToBottom]);

  const renderMessageContent = (message) => {
    if (message.listItems) {
      return (
        <div>
          <p>{message.text}</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {message.listItems.map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    
    if (message.contactInfo) {
      return (
        <div className="space-y-3">
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <FaPhone className="text-orange-600" />
            </div>
            <a href={`tel:${chatbotConfig.contact.phone}`} className="text-orange-600 hover:underline">
              {chatbotConfig.contact.phone}
            </a>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaEnvelope className="text-blue-600" />
            </div>
            <a href={`mailto:${chatbotConfig.contact.email}`} className="text-blue-600 hover:underline">
              {chatbotConfig.contact.email}
            </a>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaMapMarkerAlt className="text-green-600" />
            </div>
            <span>{chatbotConfig.contact.address}</span>
          </div>
        </div>
      );
    }
    
    return <p>{message.text}</p>;
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {!state.isOpen ? (
        <button
          onClick={() => setState(prev => ({ ...prev, isOpen: true }))}
          className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          aria-label="Open chatbot"
        >
          <FaRobot size={20} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      ) : (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden transform transition-all duration-300 max-h-[80vh]">
          <div className="bg-gradient-to-r from-orange-600 to-orange-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FaRobot size={20} />
                </div>
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-orange-600"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg">NISATEL Assistant</h3>
                <p className="text-xs text-white/80">{state.isTyping ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
            <button 
              onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
              className="text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white" style={{ maxHeight: 'calc(80vh - 150px)' }}>
            {state.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-br-none'
                    : 'bg-gray-100 rounded-bl-none'
                } shadow-sm transition-all duration-200 hover:shadow-md`}>
                  {renderMessageContent(msg)}
                  {msg.buttons && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.buttons.map((btn, j) => (
                        <button
                          key={j}
                          onClick={() => handleUserAction(btn.value, btn.text)}
                          className={`text-xs px-3 py-1.5 rounded-full flex items-center transition ${
                            btn.value.includes('quote') || btn.value.includes('call_') || btn.value.includes('email_') || btn.value.includes('maps_')
                              ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:shadow-md'
                              : btn.value === 'menu'
                                ? 'bg-gray-200 hover:bg-gray-300'
                                : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {btn.icon && <span className="mr-1">{btn.icon}</span>}
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {state.isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={state.inputValue}
                onChange={(e) => setState(prev => ({ ...prev, inputValue: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleUserAction(state.inputValue, state.inputValue)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm transition"
                aria-label="Message input field"
                disabled={state.isTyping}
              />
              <button
                onClick={() => handleUserAction(state.inputValue, state.inputValue)}
                disabled={!state.inputValue.trim() || state.isTyping}
                className={`p-3 rounded-xl ${
                  state.inputValue.trim() && !state.isTyping
                    ? 'bg-gradient-to-r from-orange-500 to-orange-500 text-white hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } transition`}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              NISATEL Virtual Assistant - Instant responses
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotEn;