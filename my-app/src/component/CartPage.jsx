import { useNavigate } from "@tanstack/react-router";
import { useCart } from "./CartContext";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart();
  if (cartItems.length === 0)
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
        {cartItems.map((item) => (
          <div key={item.id}>
            <img src={item.place_holder_image} alt={item.name} />
            <div className="button">
              <button onClick={() => handleAddToCart(item)}>
                <FaPlus size={20} color="green" className="add-button" /> Add
                Item
              </button>
              <button
                onClick={() => handleRemoveFromCart(item)}
                className="remove-button"
              >
                <FaMinus size={20} color="red" /> Remove Item
              </button>
            </div>
            <p className="item__price">{item.price}$NZ</p>
            <p className="item_seller">{item.seller_name}</p>
            <p className="item__quantities">Quantity:{item.quantity}</p>
            <p className="price">Total:{item.price * item.quantity}$NZ</p>
          </div>
        ))}
        <h2 className="total-price">
          Total Price:{" "}
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}{" "}
          $NZ
        </h2>

        <h2 className="payment">
          <button onClick={() => navigate({ to: "/payment" })}>Pay now</button>
        </h2>
      </div>
    </>
  );
};

export default CartPage;
