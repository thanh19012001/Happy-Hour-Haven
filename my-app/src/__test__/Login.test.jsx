import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import LoginForm from "../component/LoginForm";

// test valid value
test("test for login with right username and password", async () => {
  //Mock fetch success
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        access: "fake-access-token",
        refresh: "fake-refresh-token",
      }),
  });

  render(<LoginForm />);

  // add valid value to username
  fireEvent.change(screen.getByPlaceholderText("Enter Username Here"), {
    target: { value: "HHH" },
  });

  // add valid value to password
  fireEvent.change(screen.getByPlaceholderText("Enter Password Here"), {
    target: { value: "123" },
  });

  //click button log in
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));
  // Check tokens saved to localStorage
  await waitFor(() => {
    expect(localStorage.getItem("access")).toBe("fake-access-token");
    expect(localStorage.getItem("refresh")).toBe("fake-refresh-token");
  });
});

test("test for login with wrong username and password", async () => {
  //Mock fetch success
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
  });

  render(<LoginForm />);

  // add invalid value to username
  fireEvent.change(screen.getByPlaceholderText("Enter Username Here"), {
    target: { value: "HHHH" },
  });

  // add invalid value to password
  fireEvent.change(screen.getByPlaceholderText("Enter Password Here"), {
    target: { value: "123222" },
  });

  //click button log in
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));
  // Check tokens saved to localStorage
  await waitFor(() => {
    expect(screen.getByText("Invalid username or password")).toBeInTheDocument;
  });
});
