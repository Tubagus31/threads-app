import { expect, describe, it } from "vitest";
import leaderboardsReducer from "./reducer";

describe("leaderboardsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const intitalState = [];
    const action = { type: "UNKNOWN" };

    const nextState = leaderboardsReducer(intitalState, action);

    expect(nextState).toEqual(intitalState);
  });

  // GET_LEADERBOARDS action
  it("should update the state when given GET_LEADERBOARDS action", () => {
    const initialState = [];
    const action = {
      type: "GET_LEADERBOARDS",
      payload: {
        leaderboards: [
          {
            user: {
              id: "users-1",
              name: "John Doe",
              email: "john@example.com",
              avatar: "https://generated-image-url.jpg",
            },
            score: 10,
          },
          {
            user: {
              id: "users-2",
              name: "Jane Doe",
              email: "jane@example.com",
              avatar: "https://generated-image-url.jpg",
            },
            score: 5,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
