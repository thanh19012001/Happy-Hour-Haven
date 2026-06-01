import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useFavorite } from "./FavoriteContext";
import { useContact } from "./ContactContext";
import { useTranslation } from "react-i18next";
import { useCurrency } from "./CurrencyContext";
import i18next from "i18next";

function PaymentPage() {
  const { t, i18n } = useTranslation();
  const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart();
  const { favoriteItems } = useFavorite();
  const { contacts } = useContact();
  const { convert, currentCurrency } = useCurrency(); // we can take the code&symbol
  const handleCheckout = async () => {
    console.log("i18n.language:", i18n.language); // ← thêm
    console.log("currentCurrency:", currentCurrency);
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
        body: JSON.stringify({
          cartItems,
          language: i18n.language,
          currency: currentCurrency.code,
        }),
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
      <h1>{t("checkoutPage", "Checkout Page")}</h1>

      {cartItems.length === 0 ? (
        <p>
          {t(
            "yourCartIsEmptyPleaseAddSomeItemsFirst",
            "Your cart is empty. Please add some items first.",
          )}
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <br />
                <img
                  src={item.image}
                  alt={item.product_name}
                  style={{ width: 300, height: 300 }}
                />
                <div className="item-info">
                  <br />
                  <h2>{item.product_name}</h2>
                  <p>{convert(item.price)}</p>
                  <p>
                    {t("sellerSeller_name", "Seller: {{seller_name}}", {
                      seller_name: item.seller_name,
                    })}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="quantity-btn"
                    >
                      <FaMinus size={14} />
                    </button>
                    <span className="quantity">
                      {t("qtyQuantity", "Qty: {{quantity}}", {
                        quantity: item.quantity,
                      })}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="quantity-btn"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>

                  <p className="subtotal">
                    {t("total", "Total: ")}
                    {convert((item.price * item.quantity).toFixed(2))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h2>{t("totalAmount", "Total Amount: $")}</h2>
            <span>{convert(totalAmount)}</span>
            <button
              onClick={handleCheckout}
              className="checkout-btn"
              disabled={cartItems.length === 0}
            >
              {t("proceedToPayment", "Proceed to Payment")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentPage;
