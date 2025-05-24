import { showLoading, hideLoading } from "react-redux-loading-bar";
import { asyncCreateThread } from "./action";
import threadsAPI from "../../utils/API/threadsAPI";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../utils/API/threadsAPI");

describe("asyncCreateThread thunk function", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    vi.clearAllMocks();
    global.alert = vi.fn();
  });

  it("should dispatch showLoading and hideLoading when thread creation is successful", async () => {
    const fakeThread = { title: "title", body: "body", category: "" };
    threadsAPI.createThread.mockResolvedValue(fakeThread);

    await asyncCreateThread(fakeThread)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should call the API with an empty string for category if not provided", async () => {
    const inputPayload = { title: "judul", body: "isi" }; // tanpa category
    const expectedPayload = { ...inputPayload, category: "" };
    threadsAPI.createThread.mockResolvedValue(expectedPayload);

    await asyncCreateThread(inputPayload)(dispatch);

    expect(threadsAPI.createThread).toHaveBeenCalledWith(expectedPayload);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
