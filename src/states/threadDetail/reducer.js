import { ActionType } from './action';

let isAlreadyUpVoted, isAlreadyDownVoted, isUpVoted, isDownVoted;
const removeVote = (array, userId) => array.filter((id) => id !== userId);

const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
  case ActionType.GET_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

    // thread
  case ActionType.UP_VOTE_THREAD_DETAIL:
    if (threadDetail.id !== action.payload.threadId) return threadDetail;

    isAlreadyUpVoted = threadDetail.upVotesBy.includes(action.payload.userId);
    isDownVoted = threadDetail.downVotesBy.includes(action.payload.userId);

    return {
      ...threadDetail,
      upVotesBy: isAlreadyUpVoted
        ? removeVote(threadDetail.upVotesBy, action.payload.userId)
        : [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: isDownVoted
        ? removeVote(threadDetail.downVotesBy, action.payload.userId)
        : threadDetail.downVotesBy,
    };

  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    if (threadDetail.id !== action.payload.threadId) return threadDetail;

    isUpVoted = threadDetail.upVotesBy.includes(action.payload.userId);
    isAlreadyDownVoted = threadDetail.downVotesBy.includes(
      action.payload.userId
    );

    return {
      ...threadDetail,
      upVotesBy: isUpVoted
        ? removeVote(threadDetail.upVotesBy, action.payload.userId)
        : threadDetail.upVotesBy,
      downVotesBy: isAlreadyDownVoted
        ? removeVote(threadDetail.downVotesBy, action.payload.userId)
        : [...threadDetail.downVotesBy, action.payload.userId],
    };

  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    if (threadDetail.id !== action.payload.threadId) return threadDetail;
    return {
      ...threadDetail,
      upVotesBy: removeVote(threadDetail.upVotesBy, action.payload.userId),
      downVotesBy: removeVote(
        threadDetail.downVotesBy,
        action.payload.userId
      ),
    };

    // comment
  case ActionType.CREATE_COMMENT:
    return {
      ...threadDetail,
      comments: [...threadDetail.comments, action.payload.comment],
    };

  case ActionType.UP_VOTE_COMMENT_DETAIL:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;

        isUpVoted = comment.upVotesBy.includes(action.payload.userId);
        isDownVoted = comment.downVotesBy.includes(action.payload.userId);

        return {
          ...comment,
          upVotesBy: isUpVoted
            ? removeVote(comment.upVotesBy, action.payload.userId)
            : [...comment.upVotesBy, action.payload.userId],
          downVotesBy: isDownVoted
            ? removeVote(comment.downVotesBy, action.payload.userId)
            : comment.downVotesBy,
        };
      }),
    };

  case ActionType.DOWN_VOTE_COMMENT_DETAIL:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;

        isUpVoted = comment.upVotesBy.includes(action.payload.userId);
        isDownVoted = comment.downVotesBy.includes(action.payload.userId);

        return {
          ...comment,
          upVotesBy: isUpVoted
            ? removeVote(comment.upVotesBy, action.payload.userId)
            : comment.upVotesBy,
          downVotesBy: isDownVoted
            ? removeVote(comment.downVotesBy, action.payload.userId)
            : [...comment.downVotesBy, action.payload.userId],
        };
      }),
    };

  case ActionType.NEUTRALIZE_VOTE_COMMENT_DETAIL:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;

        isUpVoted = comment.upVotesBy.includes(action.payload.userId);
        isDownVoted = comment.downVotesBy.includes(action.payload.userId);

        return {
          ...comment,
          upVotesBy: isUpVoted
            ? removeVote(comment.upVotesBy, action.payload.userId)
            : comment.upVotesBy,
          downVotesBy: isDownVoted
            ? removeVote(comment.downVotesBy, action.payload.userId)
            : comment.downVotesBy,
        };
      }),
    };

  default:
    return threadDetail;
  }
};

export default threadDetailReducer;
