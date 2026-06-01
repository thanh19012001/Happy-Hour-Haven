import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router"; // Thêm navigate


export default function useRegisterForm() {
  const URL = "http://127.0.0.1:9000/register/";
  const navigate = useNavigate(); // Dùng navigate thay vì window.location
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const addUserMutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || errorData.username || "Failed to add new user");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsRegister(true);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Dùng navigate thay vì window.location
      setTimeout(() => {
        navigate({ to: "/" });
      }, 2000); // Delay 2 giây để user thấy thông báo thành công
    },
    onError: (error) => {
      console.log(error);
      // Xử lý các loại lỗi khác nhau
      if (error.message.includes("already exists")) {
        setErrorMessage("Username already exists");
      } else {
        setErrorMessage(error.message || "Registration failed");
      }
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Username and password are required");
      return;
    }
    
    if (username.length < 2 || username.length > 10) {
      setErrorMessage("Username must be between 2 and 10 characters");
      return;
    }
    
    if (password.length < 1) {
      setErrorMessage("Password must be at least 1 characters");
      return;
    }
    
    addUserMutation.mutate({ username, password });
  };

  // Thêm hàm reset form
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setErrorMessage("");
    setIsRegister(false);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleRegister,
    errorMessage,
    isLoading: addUserMutation.isPending,
    isRegister,
    resetForm, // Export thêm hàm reset
  };
}
