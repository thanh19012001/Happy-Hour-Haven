import { expect, test } from "vitest";

const calcTotalItems = (cartItems) =>
  cartItems.reduce((sum, item) => sum + item.quantity, 0);

const calcTotalCost = (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

const mockCart = [
  { id: 1, name: "Bia", price: 10, quantity: 2 },
  { id: 2, name: "Rượu", price: 15, quantity: 3 },
];

// Total items test
test("calculates total items correctly", () => {
  const result = calcTotalItems(mockCart);
  expect(result).toBe(5); // 2 + 3 = 5
});

// total cost test
test("calculates total cost correctly", () => {
  const result = calcTotalCost(mockCart);
  expect(result).toBe(65); // (10*2) + (15*3) = 20 + 45 = 65
});

// empty cart test
test("returns 0 when cart is empty", () => {
  expect(calcTotalItems([])).toBe(0);
  expect(calcTotalCost([])).toBe(0);
});
