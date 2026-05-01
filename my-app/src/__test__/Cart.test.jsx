import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CartProvider } from "../component/CartContext";
import CartPage from "../component/CartPage";

// mock itm
const mockItems = {
  id: 1,
  name: "Rum",
  price: 30,
  quantity: 1,
  place_holder_image: "test.jpg",
  seller_name: "Test",
};

// render
const renderCart = () => {
  return render(
    <CartProvider>
      <CartPage />
    </CartProvider>,
  );
};

// no items
test("shows empty cart message when no items", () => {
  renderCart();
  expect(screen.getByText("No item")).toBeInTheDocument();
});

// add item
test("add item to cart", () => {
  sessionStorage.setItem("cartItems", JSON.stringify([mockItems]));
  renderCart();
  expect(screen.getByText("Quantity:1"));
  fireEvent.click(screen.getByText("Add Item"));
  expect(screen.getByText("Quantity:2"));
});

// remove item
test("Remove item to cart", () => {
  sessionStorage.setItem("cartItems", JSON.stringify([mockItems]));
  renderCart();
  expect(screen.getByText("Quantity:1"));
  fireEvent.click(screen.getByText("Remove Item"));
  expect(screen.getByText("No item"));
});
