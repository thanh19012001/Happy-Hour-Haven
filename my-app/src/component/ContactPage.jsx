import React from "react";
import { useContact } from "./ContactContext";

const ContactPage = () => {
  const { contacts } = useContact();

  return (
    <>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
      </div>
      <h2>Contact list</h2>
      <div className="contact-wrapper">
        {contacts.map((contact, index) => (
          <div className="contact-body" key={index}>
            <br />
            <p className="contact-name">{contact.name}</p>
            <p className="contact-phone">{contact.phone}</p>
            <p className="contact-email">{contact.email}</p>
            <img src={contact.image} alt={contact.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactPage;
