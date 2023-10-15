import Image from "next/image";
import livechat from "../../../../public/assets/logo/livechat.png";
import styles from "./LiveChat.module.scss";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import useAuthStore from "../../../store/loginStore";
export default function LiveChatComponent(props) {
  const { isLoggedIn } = useAuthStore();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [askForUserInfo, setAskForUserInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
    if (!isChatOpen && !isLoggedIn) {
      // If chat is opened and user is not logged in, ask for user info
      console.log("Asking for user info...");
      setAskForUserInfo(true);
    }
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();

    // Close the user info form and open the chat
    setAskForUserInfo(false);
    setIsChatOpen(true);
  };

  console.log("askForUserInfo:", askForUserInfo);

  return (
    <>
      <div className={isChatOpen ? styles.chat_open : styles.chat_closed}>
        <div className={styles.chat_box}>
          {/* Chat Box Header */}
          <div className={styles.chat_box_header}>
            Live Chat
            <IconButton
              aria-label="delete"
              color="success"
              className={styles.chat_box_toggle}
              onClick={toggleChat}
              style={{ color: "white" }}
            >
              <ClearIcon />
            </IconButton>
          </div>

          {/* Chat Box Body */}
          <div className={styles.chat_box_body}>
            <Box sx={{ p: 2, height: 300 }}>
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

              {askForUserInfo && (
                <form onSubmit={handleUserInfoSubmit}>
                  <TextField
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </form>
              )}
            </Box>
          </div>

          {/* Chat Box Input */}
          <div className="chat-input">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={8}>
                  <TextField
                    type="text"
                    id="chat-input"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    label="Send a message..."
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={4}>
                  <Button
                    variant="contained"
                    type="submit"
                    className="chat-submit"
                    id="chat-submit"
                    disabled={askForUserInfo}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
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
