import Image from "next/image";
import livechat from "../../../../public/assets/logo/livechat.png";
import styles from "./LiveChat.module.scss";
import { useState, useEffect } from "react";
export default function LiveChatComponent(props) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Add any initial setup logic here
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      text: inputMessage,
      type: "self" // You can set the message type as needed
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Implement the logic for generating responses here if needed
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle the chat dialog visibility
  };

  return (
    <>
      <div className={isChatOpen ? styles.chat_open : styles.chat_closed}>
        <div className={styles.chat_box}>
          {/* Chat Box Header */}
          <div className={styles.chat_box_header}>
            ChatBot
            <span className={styles.chat_box_toggle} onClick={toggleChat}>
              <i className="material-icons">close</i>
            </span>
          </div>

          {/* Chat Box Body */}
          <div className={styles.chat_box_body}>
            <div className={styles.chat_box_overlay}></div>
            <div className="chat-logs">
              {messages.map((message, index) => (
                <div key={index} className={`chat-msg ${message.type}`}>
                  <span className="msg-avatar">
                    <img
                      src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745"
                      alt="Avatar"
                    />
                  </span>
                  <div className="cm-msg-text">{message.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Box Input */}
          <div className="chat-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="chat-input"
                placeholder="Send a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button type="submit" className="chat-submit" id="chat-submit">
                <i className="material-icons">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.liveChatBtn}>
        <div className={styles.liveChatBtnCta} onClick={toggleChat}>
          <LiveChatButton isOpen={isChatOpen} />
        </div>
      </div>
    </>
  );
}

function LiveChatButton({ isOpen }) {
  return <Image src={livechat} alt="livechat" />;
}
