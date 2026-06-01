import { useNavigate } from "@tanstack/react-router";
import { useCart } from "./CartContext";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCurrency } from "./CurrencyContext";
const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, handleAddToCart, handleRemoveFromCart } = useCart();
  if (cartItems.length === 0)
    return (
      <>
       
        <div className="header">
          <h1>{t("happyHourHeaven", "Happy Hour Heaven 🥂")}</h1>
          <h3>
            {t(
              "ifDrunkDrivingIsIllegalThenWhyAreThereParkingLotsNearAPub3",
              "If drunk driving is illegal, then why are there parking lots near a\r\n            pub?",
            )}
          </h3>
        </div>
        <div>{t("noItem", "No item")}</div>
      </>
    );
  const { convert } = useCurrency();
  return (
    <>
      <div className="header">
        <h1>{t("happyHourHeaven", "Happy Hour Heaven 🥂")}</h1>
        <h3>
          {t(
            "ifDrunkDrivingIsIllegalThenWhyAreThereParkingLotsNearAPub",
            "If drunk driving is illegal, then why are there parking lots near a\r\n          pub?",
          )}
        </h3>
      </div>

      <div className="cart_items">
        <h1 className="items_cart"></h1>
        {cartItems.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            
            <div className="button">
              <button onClick={() => handleAddToCart(item)}>
                <FaPlus size={20} color="green" className="add-button" />{" "}
                {t("addItem", "Add\r\n                Item")}
              </button>
              <button
                onClick={() => handleRemoveFromCart(item)}
                className="remove-button"
              >
                <FaMinus size={20} color="red" />{" "}
                {t("removeItem", "Remove Item")}
              </button>
            </div>
            <p className="item__price">{convert(item.price)}</p>
            <p className="item_seller">{item.seller_name}</p>
            <p className="item__quantities">
              {t("quantityquantity", "Quantity:{{quantity}}", {
                quantity: item.quantity,
              })}
            </p>
            <p className="price">
              {t("total", "Total:")}
              {convert(item.price * item.quantity)}
            </p>
          </div>
        ))}
        <h2 className="total-price">
          {t("totalPrice", "Total Price:")}{" "}
          {convert(
            cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            ),
          )}{" "}
        </h2>

        <h2 className="payment">
          <button onClick={() => navigate({ to: "/payment" })}>
            {t("payNow", "Pay now")}
          </button>
        </h2>
      </div>
    </>
  );
};

export default CartPage;
