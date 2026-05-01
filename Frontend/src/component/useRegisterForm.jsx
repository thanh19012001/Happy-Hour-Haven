import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useRegisterForm() {
  const URL = "http://127.0.0.1:9000/register/";

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
      if (!res.ok) throw new Error("fail to add new user");
      return res.json();
    },
    onSuccess: () => {
      setIsRegister(true);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      window.location.href = "/";
    },
    onError: (error) => {
      console.log(error);
      setErrorMessage("Username already exists");
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    addUserMutation.mutate({ username, password });
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
  };
}
