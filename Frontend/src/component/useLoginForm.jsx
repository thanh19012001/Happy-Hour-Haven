import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function useLoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState();

  const URL = "http://127.0.0.1:9000/login/"; // API
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Check username and password again");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate({ to: "/home_page" });
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    isLoading,
    handleSubmit,
  };
}
