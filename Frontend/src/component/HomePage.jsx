import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { LuContact } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "./CartContext";
import { useFavorite } from "./FavoriteContext";
import { useTranslation, Trans } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCurrency } from "./CurrencyContext";
import Chatbot from "./Chatbot";
import LogoutButton from "./LogoutButton";
import { useAvatar } from "./AvatarContext";
import ThemeToggle from "./ThemeToggle";
const HomePage = () => {
  const { avatar, setAvatar } = useAvatar();
  //add logic theme and state
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    document.body.className = mq.matches ? "dark" : "light";
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      document.body.className = next ? "dark" : "light";
      return next;
    });
  }
  const handleLogout = () => {
    if (
      window.confirm(t("confirmLogout", "Are you sure you want to logout?"))
    ) {
      // if save in sessionStorage remove
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("username");
      // if save in localStorage remove

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("username");
      localStorage.removeItem("username");

      setAvatar(null);
      console.log("Access:", sessionStorage.getItem("access"));
      console.log("Refresh:", sessionStorage.getItem("refresh"));
      console.log("Username:", localStorage.getItem("username"));
      //back to login
      navigate({ to: "/" });
    }
  };
  const { t } = useTranslation();
  const URL = "http://127.0.0.1:9000/api/products/"; // API
  const fetchProducts = async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("fail to fetch product");
    return res.json();
  };
  const [sortOption, setSortOption] = useState("Default");
  const [searchValue, setSearchValue] = useState("");
  const [categoryOption, setCategoryOption] = useState("All");
  const { handleAddToCart, totalItems } = useCart();
  const { handleAddToFavorite, totalFavorites } = useFavorite();
  const navigate = useNavigate();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const { convert } = useCurrency();
  const displayProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .filter((product) => {
      if (categoryOption === "All") return true;
      return (
        product.category_name.toLowerCase() === categoryOption.toLowerCase()
      );
    })
    .sort((a, b) => {
      if (sortOption === "Price from high to low") {
        return b.price - a.price;
      }

      if (sortOption === "Price from low to high") {
        return a.price - b.price;
      }

      return 0;
    });

  return (
    <>
      <div className="header">
        <LogoutButton onLogout={handleLogout} />
        <h1>{t("happyHourHeaven", "Happy Hour Heaven 🥂")}</h1>
        
        <h3>
          {t(
            "ifDrunkDrivingIsIllegalThenWhyAreThereParkingLotsNearAPub",
            "If drunk driving is illegal, then why are there parking lots near a\r\n          pub?",
          )}
        </h3>
        
        <div className="nav-wrapper">
          <div className="account-wrapper">
            {" "}
            <Link to="/my_account_page" className="account">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle size={35} color="black" />
              )}
              {t("myAccount", "My Account")}
            </Link>
          </div>
          <div className="shopping-cart-container">
            <Link to="/cart_page" className="shopping-cart">
              {" "}
              <button className="shopping-cart-button">
                <FaShoppingCart size={35} color="blue" />
                {t("viewCart", "View Cart")}
              </button>
            </Link>
            <div className="items-quantities">{totalItems}</div>
          </div>

          <div className="favorite-items-wrapper">
            <Link to="/favorite_page" className="favorite-items">
              <FaHeart size={30} color="red" />
              {t("favoriteList", "Favorite list")}
            </Link>
            <div className="favorite-quantities">{totalFavorites}</div>
          </div>
          <div className="contact-wrapper">
            <Link to="/contact_page" className="contact">
              <LuContact size={30} color="grey" />
              {t("contact", "Contact")}
            </Link>
          </div>
        </div>
      </div>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <div className="body">
        <LanguageSwitcher />
        <div className="products-container">
          <div className="utilities">
            <div className="filter-options">
              <label htmlFor="options">{t("filter", "Filter")} </label>
              <select
                name="options"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option value="Default">{t("default", "Default")}</option>
                <option value="Price from high to low">
                  {t("priceHighToLow", "Price High to Low")}
                </option>
                <option value="Price from low to high">
                  {t("priceLowToHigh", "Price Low to High")}
                </option>
              </select>
            </div>

            <div className="search-bar">
              <label htmlFor="search-input">
                <Trans i18nKey="searchInputTypetextNamesearchinputValuesearchvalueOnchangeeSetsearchvalueetargetvalue">
                  Search
                  <input
                    type="text"
                    name="search-input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Trans>
              </label>
            </div>

            <div className="category-option">
              <label htmlFor="category">{t("category", "Category")} </label>
              <select
                name="category"
                onChange={(e) => setCategoryOption(e.target.value)}
                value={categoryOption}
              >
                <option value="All">{t("all", "All")}</option>
                <option value="gin">{t("gin", "Gin")}</option>
                <option value="vodka">{t("vodka", "Vodka")}</option>
                <option value="rum">{t("rum", "Rum")}</option>
                <option value="whiskey">{t("whiskey", "Whiskey")}</option>
                <option value="redwine">{t("redwine", "RedWine")}</option>
              </select>
            </div>
          </div>

          <ul className="products-wrapper">
            {displayProducts.map((product) => (
              <li
                className="product"
                key={product.id}
                onDoubleClick={() =>
                  navigate({
                    to: "/products/$id",
                    params: { id: String(product.id) },
                  })
                }
              >
                <div className="product-image-wrapper">
                  <img
                    className="image-url"
                    src={product.image}
                    alt={product.name}
                    style={{ width: 200, height: 200, objectFit: "cover" }}
                  />
                  <p className="product-price">
                    {t("price", { amount: convert(product.price) })}
                  </p>
                </div>
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-description">
                    {product.description.slice(0, 30)}
                    {t("key", "...")}
                  </p>
                  <p className="product-category">{product.category_name}</p>
                  <p className="listing-date">{product.date.slice(0, 10)}</p>
                  <p className="seller">{product.seller_name}</p>
                  <div className="product-actions">
                    <button onClick={() => handleAddToCart(product)}>
                      {t("addToCart", "Add to cart")}{" "}
                      <FaShoppingCart size={16} color="blue" />
                    </button>
                    <button onClick={() => handleAddToFavorite(product)}>
                      {t("addToFavorite", "Add to favorite")}{" "}
                      <FaHeart size={16} color="red" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chatbot">
          <Chatbot />
        </div>
      </div>
    </>
  );
};

export default HomePage;
