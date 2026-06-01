import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock hook before import component
vi.mock("../component/useLoginForm", () => ({
  default: () => ({
    username: "",
    setUsername: vi.fn(),
    password: "",
    setPassword: vi.fn(),
    mfaRequired: false,
    mfaCode: "",
    setMfaCode: vi.fn(),
    errorMessage: "",
    isLoading: false,
    handleSubmit: vi.fn(),
  }),
}));

import LoginForm from "../component/LoginForm";

describe("LoginForm", () => {

  // Test 1: Render input field
  it("renders username and password inputs", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("Enter Username Here")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password Here")).toBeInTheDocument();
  });

  // Test 2: Have Log in
  it("renders a Log in button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  // Test 3:  MFA input when mfaRequired = false
  it("does not show MFA input by default", () => {
    render(<LoginForm />);
    expect(screen.queryByPlaceholderText("Enter 6-digit code")).not.toBeInTheDocument();
  });

});