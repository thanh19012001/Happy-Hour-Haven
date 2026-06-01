import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./ChatbotIcon";
import styles from "../css/Chatbot.module.css";
import ChatbotForm from "./ChatbotForm";
import ChatMessage from "./ChatMessage";
import {Info} from "./Info";

// Chỉ giữ lại các icon thực sự sử dụng để tối ưu dung lượng code
import { X } from "lucide-react";
import { MdModeComment } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: Info,
      hideInChat: true,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const chatBodyRef = useRef();

  const updateHistory = (text) => {
    setChatHistory((prev) => [
      ...prev.filter((message) => message.text !== "thinking..."),
      { role: "model", text },
    ]);
  };

  const generateBotResponse = async (history) => {
    // Định dạng lại lịch sử trò chuyện đúng cấu trúc mảng API
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_API_KEY}`,
        requestOptions,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Yêu cầu API thất bại");
      }

      // KIỂM TRA AN TOÀN 1: Nếu câu hỏi bị bộ lọc chặn (Safety) hoặc không có dữ liệu trả về
      const candidate = data.candidates?.[0];
      if (
        !candidate ||
        candidate.finishReason === "SAFETY" ||
        !candidate.content
      ) {
        updateHistory(
          "Sorry, this question violates our content policy. Could you please ask a different question?",
        );
        return;
      }

      // KIỂMTRA AN TOÀN 2: Lấy chuỗi văn bản an toàn bằng toán tử ?. để tránh crash ứng dụng
      const botMessage = candidate.content.parts?.[0]?.text;

      if (botMessage) {
        updateHistory(botMessage);
      } else {
        updateHistory("Sorry, I am unable to process your request at this time. Please try again later.");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      updateHistory(
        "Unable to complete your request. The connection may have been lost, or your API quota may have been exceeded. Please verify your API key and account usage, then try again.",
      );
    }
  };

  // Các component Icon nội bộ (Chỉnh lại size và màu sắc để hiển thị cân đối)
  function CloseButton() {
    return <X size={22} strokeWidth={2.5} color="#fff" />;
  }

  function CommentComponent() {
    return <MdModeComment size={24} color="#fff" />;
  }

  function ArrowDown() {
    return <IoIosArrowDown size={22} color="#fff" />;
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {/* Chatbot Popup */}
        <div className={`${styles.chatbotPopup} ${isOpen ? styles.open : ""}`}>
          {/* Chatbot Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <ChatbotIcon />
              <h2 className={styles.logoText}>Chatbot</h2>
            </div>
            {/* Đã xoá class material-symbols-outlined gây lỗi hiển thị icon mũi tên */}
            <button
              className={styles.arrowDown}
              onClick={() => setIsOpen(false)}
            >
              <ArrowDown />
            </button>
          </div>

          {/* Chatbot Body */}
          <div ref={chatBodyRef} className={styles.chatBody}>
            <div className={`${styles.message} ${styles.botMessage}`}>
              <ChatbotIcon />
              <p className={styles.messageText}>
                Hey There 👋
                <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chatbot Footer */}
          <div className={styles.chatFooter}>
            <ChatbotForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      {/* Đã chuyển đổi sang dạng JSX chuẩn <Component /> và gỡ thẻ class cũ gây đè icon */}
      <button
        className={styles.chatbotToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseButton /> : <CommentComponent />}
      </button>
    </div>
  );
};

export default Chatbot;
