import { showLoading } from "react-redux-loading-bar";
import threadsAPI from "../../utils/API/threadsAPI";
import { hideLoading } from "react-redux-loading-bar";

const ActionType = {
  GET_ALL_THREADS: "GET_ALL_THREADS",
  CREATE_THREAD: "CREATE_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRALIZE_VOTE_THREAD: "NEUTRALIZE_VOTE_THREAD",
};

const getAllThreadsActionCreation = (threads) => {
  return {
    type: ActionType.GET_ALL_THREADS,
    payload: {
      threads,
    },
  };
};

const createThreadActionCreation = (thread) => {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
};

const upVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const neutralizeVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const downVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const asyncCreateThread = ({ title, body, category = "" }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await threadsAPI.createThread({ title, body, category });
      dispatch(createThreadActionCreation(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncUpVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await threadsAPI.upVoteThread(threadId);
    } catch (error) {
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      alert(error.message);
    }
  };
};

const asyncDownVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await threadsAPI.downVoteThread(threadId);
    } catch (error) {
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      alert(error.message);
    }
  };
};

const asyncNeutralizeVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await threadsAPI.neutralizeVoteThread(threadId);
    } catch (error) {
      dispatch(
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
      alert(error.message);
    }
  };
};

export {
  ActionType,
  getAllThreadsActionCreation,
  createThreadActionCreation,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};
