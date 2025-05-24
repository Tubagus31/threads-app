import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer";

describe("threadsReducer function", () => {
  // Unknown Action
  it("should return the initial state when given by unknown action", () => {
    const intitalState = [];
    const action = { type: "UNKNOWN" };

    const nextState = threadsReducer(intitalState, action);

    expect(nextState).toEqual(intitalState);
  });

  // GET_ALL_THREADS action
  it("should return all the threads when given by GET_ALL_THREADS action", () => {
    const initialState = [];
    const action = {
      type: "GET_ALL_THREADS",
      payload: {
        threads: [
          {
            id: "thread-1",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: "thread-2",
            title: "Thread Kedua",
            body: "Ini adalah thread kedua",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  // CREATE_THREAD action
  it("should return all the threads when given by CREATE_THREAD action", () => {
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: "CREATE_THREAD",
      payload: {
        thread: {
          id: "thread-2",
          title: "Thread Kedua",
          body: "Ini adalah thread kedua",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-2",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  // UP_VOTE_THREAD action
  it("should return all the threads when given by UP_VOTE_THREAD action", () => {
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: "thread-2",
        title: "Thread Kedua",
        body: "Ini adalah thread kedua",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-2",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        threadId: "thread-2",
        userId: "john_doe",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(
      initialState.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;

        return {
          ...thread,
          upVotesBy: [...thread.upVotesBy, action.payload.userId],
        };
      })
    );
  });

  // DOWN_VOTE_THREAD action
  it("should return all the threads when given by DOWN_VOTE_THREAD action", () => {
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: "thread-2",
        title: "Thread Kedua",
        body: "Ini adalah thread kedua",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-2",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "john_doe",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(
      initialState.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;

        return {
          ...thread,
          downVotesBy: [...thread.downVotesBy, action.payload.userId],
        };
      })
    );
  });

  // NEUTRALIZE_VOTE_THREAD action
  it("should return all the threads when given by NEUTRALIZE_VOTE_THREAD action", () => {
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: ["john_doe"],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: "thread-2",
        title: "Thread Kedua",
        body: "Ini adalah thread kedua",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-2",
        upVotesBy: [],
        downVotesBy: ["john_doe"],
        totalComments: 0,
      },
    ];

    const action = {
      type: "NEUTRALIZE_VOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "john_doe",
      },
    };

    const action2 = {
      type: "NEUTRALIZE_VOTE_THREAD",
      payload: {
        threadId: "thread-2",
        userId: "john_doe",
      },
    };

    // already upVoted
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(
      initialState.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;

        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      })
    );

    // already downVoted
    const nextState2 = threadsReducer(initialState, action2);

    expect(nextState2).toEqual(
      initialState.map((thread) => {
        if (thread.id !== action2.payload.threadId) return thread;

        return {
          ...thread,
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action2.payload.userId
          ),
        };
      })
    );
  });
});
