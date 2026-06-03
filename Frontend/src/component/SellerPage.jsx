import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useContact } from "./ContactContext";
import { useState } from "react";

const SellerPage = () => {
  const { id } = useParams({ from: `/sellers/$id` });
  const [isSaved, setIsSaved] = useState(false);
  const URL = `http://127.0.0.1:8000/api/sellers/${id}/`;
  const fetchSellers = async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("fail to fetch product");
    return res.json();
  };

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
  const { setContacts } = useContact();
  const {
    data: seller,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["seller", id],
    queryFn: fetchSellers,
    staleTime: 5 * 60 * 1000,
  });

  const handleSaveContact = () => {
    setContacts((prev) => [
      ...prev,
      {
        username: seller.username,
        contact: seller.hack_chat_tag,
        image: seller.avatar,
        id: seller.id,
      },
    ]);

    setIsSaved(true);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error:{error.message}</div>;

  return (
    <>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
      </div>

      <div className="seller-body">
        <img className="seller_img" src={seller.avatar} alt={seller.name} />
        <p className="seller_name">{seller.username}</p>
        <p className="seller_join_date">{seller.date_joined}</p>
        <p className="seller-contact-button">
          press this button to contact
          <a href={seller.hack_chat_tag} target="_blank" rel="noreferrer">
            <button>contact</button>
          </a>
        </p>

        <h2 className="product-list">Products:</h2>
        {/* show product that seller that list on web based on id of seller */}
        <ul>
          {products
            .filter((product) => product.sellerId === seller.id)
            .map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
        </ul>

        <p className="seller-product"></p>
        <p className="button-save-contact">
          <button onClick={handleSaveContact}>Save contact</button>
          <br />
          {isSaved ? "Saved" : ""}
        </p>
      </div>
    </>
  );
};

export default SellerPage;
