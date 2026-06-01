import { useQuery } from "@tanstack/react-query";
import { useContact } from "./ContactContext";
import { useTranslation } from "react-i18next"; // 

const ContactPage = () => {
  const { t } = useTranslation(); 
  const { contacts } = useContact();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:9000/api/products/");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <div className="header">
        <h1>{t("happyHourHeaven", "Happy Hour Heaven 🥂")}</h1>
        <h3>
          {t(
            "ifDrunkDrivingIsIllegalThenWhyAreThereParkingLotsNearAPub",
            "If drunk driving is illegal, then why are there parking lots near a pub?",
          )}
        </h3>
      </div>
      
      <h2>{t("contactList", "Contact list")}</h2>
      
      <div className="contact-wrapper">
        {contacts.map((contact) => (
          <div className="contact-body" key={contact.id}>
            <img src={contact.image} alt={contact.username} />
            <p className="contact-name">{contact.username}</p>
            <p className="contact-contact">{contact.contact}</p>
            <div className="contact-activities">
              <h2>{t("productList", "Product List:")}</h2>
              <ul>
                {products
                  .filter((p) => p.sellerId === contact.id)
                  .map((product) => (
                    <li key={product.id}>{product.name}</li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactPage;