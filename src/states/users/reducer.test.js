import { expect, describe, it } from "vitest";
import usersReducer from "./reducer";

describe("usersReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const intitalState = [];
    const action = { type: "UNKNOWN" };

    const nextState = usersReducer(intitalState, action);

    expect(nextState).toEqual(intitalState);
  });

  // GET_ALL_USERS action
  it("should return the initial state when ", () => {
    const initialState = [];
    const action = {
      type: "GET_ALL_USERS",
      payload: {
        users: [
          {
            id: "john_doe",
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://generated-image-url.jpg",
          },
          {
            id: "jane_doe",
            name: "Jane Doe",
            email: "jane@example.com",
            avatar: "https://generated-image-url.jpg",
          },
          {
            id: "fulan",
            name: "Si Fulan",
            email: "fulan@example.com",
            avatar: "https://generated-image-url.jpg",
          },
        ],
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
