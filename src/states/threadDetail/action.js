import { showLoading } from 'react-redux-loading-bar';
import commentsAPI from '../../utils/API/commentsAPI';
import threadsAPI from '../../utils/API/threadsAPI';
import { hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  GET_THREAD_DETAIL: 'GET_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT_DETAIL: 'UP_VOTE_COMMENT_DETAIL',
  DOWN_VOTE_COMMENT_DETAIL: 'DOWN_VOTE_COMMENT_DETAIL',
  NEUTRALIZE_VOTE_COMMENT_DETAIL: 'NEUTRALIZE_VOTE_COMMENT_DETAIL',
};

const threadDetailActionCreation = (threadDetail) => {
  return {
    type: ActionType.GET_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
};

const clearThreadDetailActionCreator = () => {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
};

const upVoteThreadDetailActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
};

const neutralizeVoteThreadDetailActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
};

const downVoteThreadDetailActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
};

const createCommentActionCreator = ({ comment, threadId }) => {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
      threadId,
    },
  };
};

const upVoteCommentActionCreator = ({ threadId, commentId, userId }) => {
  return {
    type: ActionType.UP_VOTE_COMMENT_DETAIL,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
};

const downVoteCommentActionCreator = ({ threadId, commentId, userId }) => {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_DETAIL,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
};

const neutralizeVoteCommentActionCreator = ({
  threadId,
  commentId,
  userId,
}) => {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT_DETAIL,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
};

function asyncGetDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await threadsAPI.getDetailThread(threadId);
      dispatch(threadDetailActionCreation(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

const asyncUpVoteThreadDetail = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      upVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await threadsAPI.upVoteThread(threadId);
    } catch (error) {
      dispatch(
        upVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      );
      alert(error.message);
    }
  };
};

const asyncDownVoteThreadDetail = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      downVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await threadsAPI.downVoteThread(threadId);
    } catch (error) {
      dispatch(
        downVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      );
      alert(error.message);
    }
  };
};

const asyncNeutralizeVoteThreadDetail = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await threadsAPI.neutralizeVoteThread(threadId);
    } catch (error) {
      dispatch(
        neutralizeVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
      alert(error.message);
    }
  };
};

const asyncCreateComment = ({ threadId, content }) => {
  return async (dispatch) => {
    try {
      const comment = await commentsAPI.createComment({ threadId, content });
      dispatch(createCommentActionCreator({ comment, threadId }));
    } catch (error) {
      alert(error.message);
    }
  };
};

const asyncUpVoteComment = ({ threadId, commentId }) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
    );

    try {
      await commentsAPI.upVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(
        upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
      );
      alert(error.message);
    }
  };
};

const asyncDownVoteComment = ({ threadId, commentId }) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
    );

    try {
      await commentsAPI.downVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(
        downVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
      alert(error.message);
    }
  };
};

const asyncNeutralizeVoteComment = ({ threadId, commentId }) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      })
    );

    try {
      await commentsAPI.neutralizedVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(
        neutralizeVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
      alert(error.message);
    }
  };
};

export {
  ActionType,
  asyncGetDetailThread,
  asyncUpVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
