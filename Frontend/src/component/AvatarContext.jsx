import { createContext, useContext, useState, useEffect } from "react";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access");

    if (!token) return;

    fetch("http://127.0.0.1:8000/user/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAvatar(data.avatar))
      .catch(console.error);
  }, []);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
