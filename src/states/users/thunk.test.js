// action.test.js
import { asyncRegisterUser } from "./action";
import usersAPI from "../../utils/API/usersAPI";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../utils/API/usersAPI");

describe("asyncRegisterUser thunk", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn();
  });

  it("should call usersAPI.register with the correct payload", async () => {
    const fakeUser = {
      name: "Gus",
      email: "gus@example.com",
      password: "password123",
    };
    usersAPI.register.mockResolvedValue();

    const thunk = asyncRegisterUser(fakeUser);
    await thunk();

    expect(usersAPI.register).toHaveBeenCalledWith(fakeUser);
  });

  it("should call alert with error message if API fails", async () => {
    const fakeUser = {
      name: "John",
      email: "john@example.com",
      password: "password123",
    };
    const errorMessage = "Email already exists";
    usersAPI.register.mockRejectedValue(new Error(errorMessage));

    const thunk = asyncRegisterUser(fakeUser);
    await thunk();

    expect(global.alert).toHaveBeenCalledWith(errorMessage);
  });
});
