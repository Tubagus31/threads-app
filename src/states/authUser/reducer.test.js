import { expect, describe, it } from "vitest";
import authUserReducer from "./reducer";

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const intitalState = [];
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(intitalState, action);

    expect(nextState).toEqual(intitalState);
  });

  // SET_AUTH_USER action
  it("should set the auth user when given SET_AUTH_USER action", () => {
    const initialState = [];
    const action = {
      type: "SET_AUTH_USER",
      payload: {
        authUser: {
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  // UNSET_AUTH_USER action
  it("should return null when given by UNSET_AUTH_USER action", () => {
    const initialState = [];
    const action = {
      type: "UNSET_AUTH_USER",
      payload: {
        authUser: null,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
