import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
// import "@testing-library/jest-dom";
import LeaderboardItem from "./LeaderboardItem";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("LeaderboardItem component", () => {
  it("should display the user avatar, name, score, and number correctly", () => {
    const mockUser = {
      id: "johndoe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://avatar-url.com/avatar.jpg",
    };

    render(<LeaderboardItem user={mockUser} score={150} no={1} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();

    const avatar = screen.getByAltText("user");
    expect(avatar).toHaveAttribute("src", mockUser.avatar);
    expect(avatar).toHaveAttribute("alt", "user");
  });
});
