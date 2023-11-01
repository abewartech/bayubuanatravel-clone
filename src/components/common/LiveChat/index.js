import Image from "next/image";
import { useRef } from "react";
import livechat from "../../../../public/assets/logo/livechat.png";
import styles from "./LiveChat.module.scss";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import API from "../../../common/api";
import useAuthStore from "../../../store/loginStore";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
export default function LiveChatComponent(props) {
  const { isLoggedIn, email } = useAuthStore();

  const tawkMessengerRef = useRef();

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [askForUserInfo, setAskForUserInfo] = useState(false);
  const [emailGuest, setEmailGuest] = useState("");
  const [name, setName] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the WebSocket connection when the component mounts
    const newSocket = new WebSocket(
      "wss://user1697714815999.requestly.dev/chat"
    );

    // Set up event listeners for WebSocket messages
    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newSocket.onmessage = (event) => {
      // Parse and process the incoming message
      const message = JSON.parse(event.data);
      setMessages([...messages, message]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const fetchMessages = async () => {
    try {
      const response = await API.get(
        `contents/v1/livechat?email=${email ? email : emailGuest}`
      );
      if (response.status === 200) {
        const data = response.data;
        // Assuming the API returns an array of messages, update the state
        setMessages(data.data);
      } else {
        // Handle errors here if needed
        console.error("Failed to fetch messages from the API");
      }
    } catch (error) {
      // Handle any network errors here
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    // Function to fetch messages from the API

    // Call the fetchMessages function when the component mounts
    fetchMessages();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      text: inputMessage,
      type: "self", // You can set the message type as needed
      isSender: true, // Assuming you're the sender
      isRead: true // Assuming the message is read
    };

    // Update the local state with the new message
    setMessages([...messages, newMessage]);

    setInputMessage("");

    fetchMessages();

    // Send the message to the backend
    try {
      const response = await fetch(
        "https://user1697714815999.requestly.dev/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMessage)
        }
      );

      if (response.ok) {
        // Message sent successfully to the backend
      } else {
        // Handle errors if needed
        console.error("Failed to send the message to the backend.");
      }

      if (socket) {
        socket.send(JSON.stringify(newMessage));
      }
    } catch (error) {
      // Handle network errors here
      console.error("Network error:", error);
    }
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
    fetchMessages();
  };

  return (
    <>
    <TawkMessengerReact
      propertyId="6541c637a84dd54dc48753b7"
      widgetId="1he4esimm"
      useRef={tawkMessengerRef}
    />
      {/* <div className={isChatOpen ? styles.chat_open : styles.chat_closed}>
        <div className={styles.chat_box}>
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

          <div className={styles.chat_box_body}>
            <Box sx={{ p: 2, height: 300 }}>
              <div className={styles.chat_box_overlay}></div>
              <div className="chat-logs">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: message.isSender
                        ? "flex-end"
                        : "flex-start" // Adjust alignment based on sender
                    }}
                  >
                    <span style={{ width: "20px", height: "20px" }}>
                      <Image
                        src={"/assets/wanna1.png"}
                        width={20}
                        height={20}
                        alt="Avatar"
                        className="img-fluid"
                      />
                    </span>
                    <div
                      style={{
                        marginLeft: "8px",
                        padding: "8px",
                        backgroundColor: message.isSender
                          ? "#5BC7E3"
                          : "#E5E5EA", // Adjust background color based on sender
                        borderRadius: "8px",
                        color: message.isRead ? "#000" : "#999" // Adjust text color based on read status
                      }}
                    >
                      {message.text}
                    </div>
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
                    className="mb-1"
                  />
                  <TextField
                    type="email"
                    label="Email"
                    value={emailGuest}
                    onChange={(e) => setEmailGuest(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                    className="mb-1"
                  />
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </form>
              )}
            </Box>
          </div>

          <div style={{ padding: "8px", backgroundColor: "#f0f0f0" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
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
                    style={{ flex: 1 }}
                  />
                </Grid>
                <Grid xs={4}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ marginLeft: "8px", marginTop: 5 }}
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
      </div> */}
      <div className={styles.liveChatBtn}>
        <div className={styles.liveChatBtnCta} onClick={toggleChat}>
          <LiveChatButton isOpen={isChatOpen} />
          {/* <button onClick={handleMinimize}> </button> */}
        </div>
      </div>
    </>
  );
}

function LiveChatButton({ isOpen }) {
  return (
    <Image
      src={livechat}
      alt="livechat"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
