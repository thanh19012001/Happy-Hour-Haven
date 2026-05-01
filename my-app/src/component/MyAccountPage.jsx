import React from "react";
import { useQuery } from "@tanstack/react-query";

const MyAccountPage = () => {
  const URL = "http://localhost:3000/users"; //api

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
    staleTime: 5 * 60 * 1000,
  });

  const loggedInUsername = localStorage.getItem("username");

  const currentUser = users.find((user) => user.username === loggedInUsername);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading account information</div>;

  return (
    <>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
      </div>

      <div className="account-body">
        <div className="account-wrapper">
          <h2>My Account</h2>
          {currentUser ? (
            <div>
              <p className="username">Username: {currentUser.username}</p>
              <p className="email">Email: {currentUser.email}</p>
              <p className="member-since">
                Member since: {currentUser.joinDate}
              </p>
            </div>
          ) : (
            <p>User not found. Please log in again.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccountPage;
