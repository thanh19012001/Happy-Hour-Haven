import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function useLoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const URL = "http://127.0.0.1:9000/login/";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Check username and password again");
      return;
    }

    try {
      setIsLoading(true);

      const body = { username, password };
      if (mfaRequired && mfaCode) {
        body.code = mfaCode;
      }

      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.mfa_required) {
        setMfaRequired(true);
        setErrorMessage(null);
        return;
      }

      if (data.error) {
        setErrorMessage(data.error);
        return;
      }

      if (data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        navigate({ to: "/home_page" });
      }

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
    mfaRequired,
    mfaCode,
    setMfaCode,
    errorMessage,
    isLoading,
    handleSubmit,
  };
}
