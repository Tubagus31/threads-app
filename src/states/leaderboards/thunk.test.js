import { describe, it, expect, vi } from "vitest";
import usersAPI from "../../utils/API/usersAPI";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { leaderboardActionCreator, asyncGetLeaderboards } from "./action";
import { clear } from "@testing-library/user-event/dist/cjs/utility/clear.js";

describe("asyncGetLeaderboards thunk", () => {
  it("should dispatch actions correctly when data is fetched successfully", async () => {
    clear;
    const fakeLeaderboards = [
      { user: { id: "john", name: "John" }, score: 100 },
      { user: { id: "jane", name: "Jane" }, score: 80 },
    ];

    const dispatch = vi.fn();
    vi.spyOn(usersAPI, "getUserLeaderboard").mockResolvedValue(
      fakeLeaderboards
    );

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(usersAPI.getUserLeaderboard).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      leaderboardActionCreator(fakeLeaderboards)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should show alert when fetching leaderboard fails", async () => {
    const dispatch = vi.fn();
    const fakeError = new Error("Failed to fetch leaderboard");
    vi.spyOn(usersAPI, "getUserLeaderboard").mockRejectedValue(fakeError);
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(alertSpy).toHaveBeenCalledWith("Failed to fetch leaderboard");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    alertSpy.mockRestore();
  });
});
