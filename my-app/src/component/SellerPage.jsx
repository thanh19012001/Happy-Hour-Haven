import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

const SellerPage = () => {
  const { id } = useParams({ from: `/seller/$id` });
  const URL = `http://localhost:3002/sellers/${id}`;
  const fetchSellers = async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("fail to fetch product");
    return res.json();
  };

  const {
    data: seller,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["seller", id],
    queryFn: fetchSellers,
  });

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
        <p className="seller_name">{seller.name}</p>
        <p className="seller_join_date">{seller.joined_date}</p>
        <p className="seller-product"></p>
      </div>
    </>
  );
};

export default SellerPage;
