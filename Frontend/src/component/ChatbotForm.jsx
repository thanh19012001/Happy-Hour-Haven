import { useRef } from "react";
import styles from "../css/Chatbot.module.css";
import { FaArrowUp } from "react-icons/fa"; // Font Awesome (Thick arrow)
import { IoIosArrowUp } from "react-icons/io"; // Ionicons (Chevron/Accordion style)
import { MdArrowUpward } from "react-icons/md"; // Material Design (Standard arrow)
const ChatbotForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  function ArrowUp() {
    return (
      <button>
        <IoIosArrowUp size={20} color="#333" />
      </button>
    );
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };
  return (
    <form action="#" className={styles.chatForm} onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className={styles.messageInput}
        required
      />
      <button className="material-symbols-outlined"><ArrowUp/></button>
    </form>
  );
};

export default ChatbotForm;
