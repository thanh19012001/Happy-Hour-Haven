import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      // if exist +1
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // if not exist quantity = 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const handleRemoveFromCart = (product) => {
    setCartItems((prev) => {
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

  // total quantities (vd: 2 wines A + 3 wines B = 5)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, handleAddToCart, handleRemoveFromCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
