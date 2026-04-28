import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { LuContact } from "react-icons/lu";
import "../css/HomePage.css";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "./CartContext";
import { useFavorite } from "./FavoriteContext";

const HomePage = () => {
  const URL = "http://localhost:3001/products"; //change later when i have real API
  const fetchProducts = async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("fail to fetch product");
    return res.json();
  };
  const [sortOption, setSortOption] = useState("Default");
  const [searchValue, setSearchValue] = useState("");
  const { handleAddToCart, totalItems } = useCart();
  const { handleAddToFavorite, totalFavorites } = useFavorite();
  const navigate = useNavigate();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const displayProducts = products
    .filter((product) =>
      product.product_name.toLowerCase().includes(searchValue.toLowerCase()),
    )
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
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
        <div className="nav-wrapper">
          <div className="account-wrapper">
            {" "}
            <Link to="/$id/Account" className="account">
              <FaUserCircle size={35} color="black" />
              My Account
            </Link>
          </div>
          <div className="shopping-cart-container">
            <Link to="/cart_page" className="shopping-cart">
              {" "}
              <button className="shopping-cart-button">
                <FaShoppingCart size={35} color="blue" />
                View Cart
              </button>
            </Link>
            <div className="items-quantities">{totalItems}</div>
          </div>

          <div className="favorite-items-wrapper">
            <Link to="/favorite_page" className="favorite-items">
              <FaHeart size={30} color="red" />
              Favorite list
            </Link>
            <div className="favorite-quantities">{totalFavorites}</div>
          </div>
          <div className="contact-wrapper">
            <Link to="/$id/Contact" className="contact">
              <LuContact size={30} color="grey" />
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="products-container">
          <div className="utilities">
            <div className="filter-options">
              <label htmlFor="options">Filter </label>
              <select
                name="options"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option value="Default">Default</option>
                <option value="Price from high to low">
                  Price High to Low
                </option>
                <option value="Price from low to high">
                  Price Low to High
                </option>
              </select>
            </div>

            <div className="search-bar">
              <label htmlFor="search-input">
                Search
                <input
                  type="text"
                  name="search-input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </label>
            </div>
          </div>

          <ul className="products-wrapper">
            {displayProducts.map((product) => (
              <li
                className="product"
                key={product.id}
                onDoubleClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: { id: String(product.id) },
                  })
                }
              >
                <div className="product-image-wrapper">
                  <img
                    className="image-url"
                    src={product.image_url}
                    alt={product.product_name}
                    style={{ width: 200, height: 200, objectFit: "cover" }}
                  />
                  <p className="product-price">{product.price} $NZ</p>
                </div>
                <div className="product-info">
                  <p className="product-name">{product.product_name}</p>
                  <p className="product-description">
                    {product.description.slice(0, 30)}...
                  </p>
                  <p className="listing-date">{product.listing_date}</p>
                  <p className="seller">{product.seller_name}</p>
                  <div className="product-actions">
                    <button onClick={() => handleAddToCart(product)}>
                      Add to cart <FaShoppingCart size={16} color="blue" />
                    </button>
                    <button onClick={() => handleAddToFavorite(product)}>
                      Add to favorite <FaHeart size={16} color="red" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;
