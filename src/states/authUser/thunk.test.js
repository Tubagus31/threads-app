import { describe, it, expect, vi } from "vitest";
import usersAPI from "../../utils/API/usersAPI";
import api from "../../utils/API";
import { setAuthUserActionCreator, asyncSetAuthUser } from "./action";

describe("asyncSetAuthUser thunk", () => {
  it("should dispatch setAuthUserActionCreator with user data when login is successful", async () => {
    const fakeUser = {
      id: "john_doe",
      name: "gus",
      email: "gus123@gmail.com",
      avatar: "https://generated-image-url.jpg",
    };
    const fakeToken = "fake-token";
    const email = "gus123@gmail.com";
    const password = "password";
    const dispatch = vi.fn();

    vi.spyOn(usersAPI, "login").mockResolvedValue(fakeToken);
    vi.spyOn(usersAPI, "getMyProfile").mockResolvedValue(fakeUser);
    vi.spyOn(api, "putAccessToken").mockImplementation(() => {});

    await asyncSetAuthUser({ email, password })(dispatch);

    expect(usersAPI.login).toHaveBeenCalledWith({ email, password });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(usersAPI.getMyProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
  });

  it("should show an alert when login fails", async () => {
    const email = "wrong@example.com";
    const password = "wrongpassword";
    const dispatch = vi.fn();
    const fakeError = new Error("Invalid credentials");

    vi.spyOn(usersAPI, "login").mockRejectedValue(fakeError);
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await asyncSetAuthUser({ email, password })(dispatch);

    expect(alertSpy).toHaveBeenCalledWith("Invalid credentials");
    expect(dispatch).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
