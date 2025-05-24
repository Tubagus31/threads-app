import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThreadInput from "./ThreadInput";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("ThreadInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle title input typing correctly", async () => {
    render(<ThreadInput handleThreadSubmit={() => {}} />);
    const titleInput = screen.getByPlaceholderText("Title");

    await userEvent.type(titleInput, "Judul thread");

    expect(titleInput).toHaveValue("Judul thread");
  });

  it("should handle body input typing correctly", async () => {
    render(<ThreadInput handleThreadSubmit={() => {}} />);
    const bodyInput = screen.getByPlaceholderText("Body");

    await userEvent.type(bodyInput, "Ini isi thread");

    expect(bodyInput).toHaveValue("Ini isi thread");
  });

  it("should handle category input typing correctly", async () => {
    render(<ThreadInput handleThreadSubmit={() => {}} />);
    const categoryInput = screen.getByPlaceholderText("Category");

    await userEvent.type(categoryInput, "Ini category");

    expect(categoryInput).toHaveValue("Ini category");
  });

  it("should call handleThreadSubmit function when submit button is clicked", async () => {
    const mockSubmit = vi.fn();
    render(<ThreadInput handleThreadSubmit={mockSubmit} />);
    const titleInput = screen.getByPlaceholderText("Title");
    await userEvent.type(titleInput, "Ini Title");

    const bodyInput = screen.getByPlaceholderText("Body");
    await userEvent.type(bodyInput, "Ini Content Thread");

    const categoryInput = screen.getByPlaceholderText("Category");
    await userEvent.type(categoryInput, "Ini Category");

    const submitButton = screen.getByRole("button", {
      name: /submit|Create/i,
    });

    await userEvent.click(submitButton);

    expect(mockSubmit).toBeCalledWith({
      title: "Ini Title",
      body: "Ini Content Thread",
      category: "Ini Category",
    });
  });
});
