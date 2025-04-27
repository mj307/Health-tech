// import { useState, useEffect, useRef } from "react";
// import "./ChatPage.css";

// export default function ChatPage() {
//   const chatList = [
//     { id: 1, name: "Gautham Mohanraj" },
//     { id: 2, name: "Shreyas Kotla" },
//     { id: 3, name: "Mahith Ravulapati" },
//     { id: 4, name: "Neha Nayak "},
//     { id: 5, name: "Vallerie Cheng"},
//     { id: 6, name: "Olivia Wang"},
//   ];

//   const initialMessages = {
//     1: [{ sender: "Gautham Mohanraj", text: "Hello!", timestamp: "10:30 AM" }],
//     2: [{ sender: "Shreyas Kotla", text: "Hey!", timestamp: "12:00 PM" }],
//     3: [{ sender: "Mahith Ravulapati", text: "Yo!", timestamp: "2:15 PM" }],
//     4: [{ sender: "Neha Nayak", text: "Hi!", timestamp: "2:30 PM" }],
//     5: [{ sender: "Vallerie Cheng", text: "Howdy!", timestamp: "4:50 PM" }],
//     6: [{ sender: "Olivia Wang", text: "Hola", timestamp: "6:04 PM" }],
//   };

//   const [messages, setMessages] = useState(initialMessages);
//   const [selectedChat, setSelectedChat] = useState(chatList[0].id);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const messagesEndRef = useRef(null); // Auto-scroll ref

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]); // Scroll when messages update

//   // Switch chats
//   const selectChat = (chatId) => {
//     setSelectedChat(chatId);
//   };

//   // Send a message
//   const sendMessage = () => {
//     if (newMessage.trim() === "") return;
    
//     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     const updatedMessages = {
//       ...messages,
//       [selectedChat]: [...messages[selectedChat], { sender: "Me", text: newMessage, timestamp }],
//     };

//     setMessages(updatedMessages);
//     setNewMessage("");
//     setIsTyping(false);

//     // Simulate bot response
//     setTimeout(() => {
//       receiveBotMessage(selectedChat);
//     }, 1500);
//   };

//   // Simulate "Bot" Response
//   const receiveBotMessage = (chatId) => {
//     const botResponses = ["That's cool!", "Tell me more!", "Interesting!", "Nice!"];
//     const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    
//     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     const updatedMessages = {
//       ...messages,
//       [chatId]: [...messages[chatId], { sender: chatList.find(c => c.id === chatId).name, text: randomResponse, timestamp }],
//     };

//     setMessages(updatedMessages);
//   };

//   return (
//     <div className="chat-container">
//       {/* Sidebar */}
//       <div className="chat-sidebar">
//         <h2 className="chat-header">Chats</h2>
//         {chatList.map((chat) => (
//           <div
//             key={chat.id}
//             className={`chat-contact ${selectedChat === chat.id ? "active-chat" : ""}`}
//             onClick={() => selectChat(chat.id)}
//           >
//             <div className="chat-avatar" />
//             <div>
//               <p className="chat-name">{chat.name}</p>
//               <p className="chat-recent">recent chat</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Main Chat Window */}
//       <div className="chat-main">
//         <div className="chat-header-bar">
//           <div className="chat-avatar" />
//           <h2 className="chat-title">{chatList.find((chat) => chat.id === selectedChat)?.name}</h2>
//         </div>

//         {/* Chat Messages */}
//         <div className="chat-messages">
//           {messages[selectedChat].map((msg, index) => (
//             <div key={index} className={`chat-message ${msg.sender === "Me" ? "chat-me" : "chat-them"}`}>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-timestamp">{msg.timestamp}</div>
//             </div>
//           ))}
//           {isTyping && <div className="chat-typing">Typing...</div>}
//           <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
//         </div>

//         {/* Message Input Field */}
//         <div className="chat-input-container">
//           <input
//             type="text"
//             className="chat-input"
//             value={newMessage}
//             onChange={(e) => {
//               setNewMessage(e.target.value);
//               setIsTyping(true);
//             }}
//             placeholder="Type a message..."
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
//           />
//           <button className="chat-send-btn" onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import "./ChatPage.css";

function ChatPage() {
  const chatList = [
    { id: 1, name: "Sunny Smiles" },
    { id: 2, name: "Alcan Dental" },
    { id: 3, name: "Medha Janga Dental Clinic" },,
  ];

  const initialMessages = {
    1: [{ sender: "Sunny Smiles", text: "Hello!", timestamp: "10:30 AM" }],
    2: [{ sender: "Alcan Dental", text: "Be there soon!", timestamp: "12:00 PM" }],
    3: [{ sender: "Medha Janga Dental Clinic", text: "Okay, sounds good!", timestamp: "2:15 PM" }],
  };

  const [messages, setMessages] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState(chatList[0].id);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectChat = (chatId) => {
    setSelectedChat(chatId);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedMessages = {
      ...messages,
      [selectedChat]: [...messages[selectedChat], 
      { sender: "Me", text: newMessage, timestamp }],
    };

    setMessages(updatedMessages);
    setNewMessage("");
    setIsTyping(false);

    setTimeout(() => {
      receiveBotMessage(selectedChat);
    }, 1500);
  };

  const receiveBotMessage = (chatId) => {
    const botResponses = ["That's cool!", "Tell me more!", "Interesting!", "Nice!"];
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedMessages = {
      ...messages,
      [chatId]: [...messages[chatId], 
      { sender: chatList.find(c => c.id === chatId).name, text: randomResponse, timestamp }],
    };

    setMessages(updatedMessages);
  };

  return (
    <div className="chat-page-container">
      <div className="chat-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <h2 className="chat-header">Chats</h2>
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className={`chat-contact ${selectedChat === chat.id ? "active-chat" : ""}`}
              onClick={() => selectChat(chat.id)}
            >
              <div className="chat-avatar" />
              <div>
                <p className="chat-name">{chat.name}</p>
                <p className="chat-recent">
                  {messages[chat.id]?.[messages[chat.id].length - 1]?.text || "No messages"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chat Window */}
        <div className="chat-main">
          <div className="chat-header-bar">
            <div className="chat-avatar" />
            <h2 className="chat-title">{chatList.find((chat) => chat.id === selectedChat)?.name}</h2>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {messages[selectedChat].map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === "Me" ? "chat-me" : "chat-them"}`}>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-timestamp">{msg.timestamp}</div>
              </div>
            ))}
            {isTyping && <div className="chat-typing">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Field */}
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setIsTyping(true);
              }}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="chat-send-btn" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;








