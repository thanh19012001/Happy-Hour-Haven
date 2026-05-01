import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  // store information in session
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const savedFavoriteItems = sessionStorage.getItem("favoriteItems");
    return savedFavoriteItems ? JSON.parse(savedFavoriteItems) : [];
  });

  // automatic save if favoriteItems change
  useEffect(() => {
    sessionStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const handleAddToFavorite = (product) => {
    setFavoriteItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromFavorite = (product) => {
    setFavoriteItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        // nếu quantity = 1 thì xóa luôn khỏi cart
        if (exists.quantity === 1) {
          return prev.filter((item) => item.id !== product.id);
        }
        // nếu quantity > 1 thì -1
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return prev; // không tìm thấy thì giữ nguyên
    });
  };

  const totalFavorites = favoriteItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        handleAddToFavorite,
        handleRemoveFromFavorite,
        totalFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
