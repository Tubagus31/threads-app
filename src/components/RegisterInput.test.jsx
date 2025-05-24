import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterInput from "./RegisterInput";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("ThreadInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name input typing correctly", async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText("Name");

    await userEvent.type(nameInput, "Lionel Messi");

    expect(nameInput).toHaveValue("Lionel Messi");
  });

  it("should handle email input typing correctly", async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Email");

    await userEvent.type(emailInput, "messi@gmail.com");

    expect(emailInput).toHaveValue("messi@gmail.com");
  });

  it("should handle password input typing correctly", async () => {
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText("Password");

    await userEvent.type(passwordInput, "password123");

    expect(passwordInput).toHaveValue("password123");
  });

  it("should call register function when submit button is clicked", async () => {
    const mockSubmit = vi.fn();
    render(<RegisterInput register={mockSubmit} />);
    const nameInput = screen.getByPlaceholderText("Name");
    await userEvent.type(nameInput, "Lionel Messi");

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "messi@gmail.com");

    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "password123");

    const submitButton = screen.getByRole("button", {
      name: /submit|Register/i,
    });

    await userEvent.click(submitButton);

    expect(mockSubmit).toBeCalledWith({
      name: "Lionel Messi",
      email: "messi@gmail.com",
      password: "password123",
    });
  });
});
