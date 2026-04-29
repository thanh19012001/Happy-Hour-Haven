import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "../css/HomePage.css";
import { useCart } from "./CartContext";
import { useFavorite } from "./FavoriteContext";

const ProductPage = () => {
  const { id } = useParams({ from: "/product/$id" });
  const URL = `http://localhost:3001/products/${id}`;
  const fetchProducts = async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("fail to fetch product");
    return res.json();
  };
  const { handleAddToCart, totalItems } = useCart();
  const { handleAddToFavorite, totalFavorites } = useFavorite();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProducts,
  });
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <div className="header">
              <h1>Happy Hour Heaven 🥂</h1>
              <h3>
                If drunk driving is illegal, then why are there parking lots
                near a pub?
              </h3>
              <div className="nav_wrapper">
                <div className="shopping_cart_container">
                  <Link to="/cart-page" className="shopping_cart">
                    {" "}
                    <button className="shopping_cart_button">
                      <FaShoppingCart size={35} color="blue" />
                      View Cart
                    </button>
                  </Link>
                  <div className="items_quantities">{totalItems}</div>
                </div>

                <div className="favorite_items_wrapper">
                  <Link to="/favorite_page" className="favorite_items">
                    <FaHeart size={30} color="red" />
                    Favorite list
                  </Link>
                  <div className="favorite_quantities">{totalFavorites}</div>
                </div>
              </div>
            </div>
            <div className="product-detail">
              <h2 className="product__name">{product.product_name}</h2>
              <img src={product.image_url} alt={product.product_name} />
              <p className="product__price">{product.price} $NZ</p>
              <p className="product__description">{product.description}</p>

              <button
                className="seller "
                onClick={() =>
                  navigate({
                    to: "/seller/$id",
                    params: { id: String(product.sellerId) },
                  })
                }
              >
                Seller: {product.seller_name}
              </button>
            </div>
            <div className="product-actions">
              <button onClick={() => handleAddToCart(product)}>
                Add to cart <FaShoppingCart size={16} color="blue" />
              </button>
              <button onClick={() => handleAddToFavorite(product)}>
                Add to favorite <FaHeart size={16} color="red" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductPage;
