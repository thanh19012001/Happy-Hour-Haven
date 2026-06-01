import { FaMinus, FaPlus } from "react-icons/fa";
import { useFavorite } from "./FavoriteContext";
import { useTranslation } from "react-i18next";
import { useCurrency } from "./CurrencyContext";
const FavoritePage = () => {
  const { t } = useTranslation();
  const { convert } = useCurrency();
  const { favoriteItems, handleAddToFavorite, handleRemoveFromFavorite } =
    useFavorite();
  if (favoriteItems.length === 0)
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
        {favoriteItems.map((item) => (
          <div key={item.id}>
            <img src={item.place_holder_image} alt={item.product_name} />
            <div className="button">
              <button onClick={() => handleAddToFavorite(item)}>
                <FaPlus size={20} color="green" className="add-button" />{" "}
                {t("addItem", "Add\r\n                Item")}
              </button>
              <button
                onClick={() => handleRemoveFromFavorite(item)}
                className="remove-button"
              >
                <FaMinus size={20} color="red" />{" "}
                {t("removeItem", "Remove Item")}
              </button>
            </div>
            <p className="item__price">
              {convert(item.price)}
            </p>
            <p className="item_seller">{item.seller_name}</p>
            <p className="item__quantities">
              {t("quantityquantity", "Quantity:{{quantity}}",{
                quantity: item.quantity,
              })}
            </p>
            <p className="total-price">
              {t("total", "Total:")}
              {convert(item.price * item.quantity)}
             
            </p>
          </div>
        ))}
        <h2>
          {t("totalPrice", "Total Price:")}{" "}
          {convert(favoriteItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ))}{" "}
         
        </h2>
      </div>
    </>
  );
};

export default FavoritePage;
