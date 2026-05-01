import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { FavoriteProvider } from "../component/FavoriteContext";
import FavoritePage from "../component/FavoritePage";

// mock item
const mockItems = {
  id: 1,
  name: "RedWine",
  price: 300,
  quantity: 1,
  place_holder_image: "test.jpg",
  seller_name: "Test",
};

// render
const renderFavorite = () => {
  return render(
    <FavoriteProvider>
      <FavoritePage />
    </FavoriteProvider>,
  );
};

// no items
test("shows empty cart message when no items", () => {
  renderFavorite();
  expect(screen.getByText("No item")).toBeInTheDocument();
});

// add item
test("add item to cart", () => {
  sessionStorage.setItem("favoriteItems", JSON.stringify([mockItems]));
  renderFavorite();
  expect(screen.getByText("Quantity:1"));
  fireEvent.click(screen.getByText("Add Item"));
  expect(screen.getByText("Quantity:2"));
});

// remove item
test("remove item to cart", () => {
  sessionStorage.setItem("favoriteItems", JSON.stringify([mockItems]));
  renderFavorite();
  expect(screen.getByText("Quantity:1"));
  fireEvent.click(screen.getByText("Remove Item"));
  expect(screen.getByText("No item"));
});
