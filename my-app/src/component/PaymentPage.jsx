import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useFavorite } from "./FavoriteContext";
import { useContact } from "./ContactContext";

function PaymentPage() {
  const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart();
  const { favoriteItems } = useFavorite;
  const { contacts } = useContact();

  const handleCheckout = async () => {
    try {
      // because stripe work based on session so we need to store session state before we pay by stripe
      sessionStorage.setItem(
        "preStripeState",
        JSON.stringify({
          favoriteItems,
          contacts,
        }),
      );
      // fetch stripe server
      const response = await fetch("http://localhost:8080/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      //check fetch error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url; // Redirect to Stripe
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error.message);
      alert("Checkout failed: " + error.message);
    }
  };

  // calculate total money for items in cart
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="payment-container">
      <h1>Checkout Page</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add some items first.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <br />
                <img
                  src={item.place_holder_image}
                  alt={item.product_name}
                  style={{ width: 300, height: 300 }}
                />
                <div className="item-info">
                  <br />
                  <h2>{item.product_name}</h2>
                  <p>Price: ${item.price} NZD</p>
                  <p>Seller: {item.seller_name}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="quantity-btn"
                    >
                      <FaMinus size={14} />
                    </button>
                    <span className="quantity">Qty: {item.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="quantity-btn"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>

                  <p className="subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)} NZD
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h2>Total Amount: ${totalAmount.toFixed(2)} NZD</h2>
            <button
              onClick={handleCheckout}
              className="checkout-btn"
              disabled={cartItems.length === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentPage;
