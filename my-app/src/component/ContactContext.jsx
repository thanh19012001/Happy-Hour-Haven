import { createContext, useState, useContext, useEffect } from "react";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  //store contact in session
  const [contacts, setContacts] = useState(() => {
    const savedContacts = sessionStorage.getItem("Contact-list");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  // automative save when we add contact
  useEffect(() => {
    sessionStorage.setItem("Contact-list", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
export const useContact = () => useContext(ContactContext);
