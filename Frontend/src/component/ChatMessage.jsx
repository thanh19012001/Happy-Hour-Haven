import React from "react";
import styles from "../css/Chatbot.module.css";
import ChatbotIcon from "./ChatbotIcon";
const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <div
        className={`${styles.message} ${styles[chat.role === "model" ? "botMessage" : "userMessage"]}`}
      >
        {chat.role === "model" && <ChatbotIcon />}
        <p className={styles.messageText}>{chat.text}</p>
      </div>
    )
  );
};

export default ChatMessage;
