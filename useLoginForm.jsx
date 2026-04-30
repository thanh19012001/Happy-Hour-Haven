import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function useLoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const URL = "http://localhost:3000/users"; // API change later
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("fail to fetch users data");
    }
    return response.json();
  };

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Check username and password again");
      return;
    }

    const foundUser = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (foundUser) {
      localStorage.setItem("isAuthenticated", "true");
      navigate({ to: "/home_page" });
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    isLoading,
    isError,
    handleSubmit,
  };
}
