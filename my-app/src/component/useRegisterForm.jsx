import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient, QueryClient } from "@tanstack/react-query";

export default function useRegisterForm() {
  const URL = "http://localhost:3000/users";
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
  const existingUser = users.some((user) => user.username === username);

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
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate({ to: "/" });
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (existingUser) {
      alert("user already exist");
      return;
    }

    addUserMutation.mutate({
      username,
      password,
    });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleRegister,
    isLoading,
    isError,
    error,
  };
}
