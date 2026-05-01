import { FaMinus, FaPlus } from "react-icons/fa";
import { useFavorite } from "./FavoriteContext";
const FavoritePage = () => {
  const { favoriteItems, handleAddToFavorite, handleRemoveFromFavorite } =
    useFavorite();
  if (favoriteItems.length === 0)
    return (
      <>
        <div className="header">
          <h1>Happy Hour Heaven 🥂</h1>
          <h3>
            If drunk driving is illegal, then why are there parking lots near a
            pub?
          </h3>
        </div>
        <div>No item</div>
      </>
    );
  return (
    <>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
      </div>

      <div className="cart_items">
        <h1 className="items_cart"></h1>
        {favoriteItems.map((item) => (
          <div key={item.id}>
            <img src={item.place_holder_image} alt={item.product_name} />
            <div className="button">
              <button onClick={() => handleAddToFavorite(item)}>
                <FaPlus size={20} color="green" className="add-button" /> Add
                Item
              </button>
              <button
                onClick={() => handleRemoveFromFavorite(item)}
                className="remove-button"
              >
                <FaMinus size={20} color="red" /> Remove Item
              </button>
            </div>
            <p className="item__price">{item.price}$NZ</p>
            <p className="item_seller">{item.seller_name}</p>
            <p className="item__quantities">Quantity:{item.quantity}</p>
            <p className="total-price">Total:{item.price * item.quantity}$NZ</p>
          </div>
        ))}
        <h2>
          Total Price:{" "}
          {favoriteItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          )}{" "}
          $NZ
        </h2>
      </div>
    </>
  );
};

export default FavoritePage;
