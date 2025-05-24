import { ActionType } from './action';

const removeVote = (array, userId) => array.filter((id) => id !== userId);

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
  case ActionType.GET_ALL_THREADS:
    return action.payload.threads;

  case ActionType.CREATE_THREAD:
    return [action.payload.thread, ...threads];

  case ActionType.UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) return thread;

      const isAlreadyUpVoted = thread.upVotesBy.includes(
        action.payload.userId
      );
      const isDownVoted = thread.downVotesBy.includes(action.payload.userId);

      return {
        ...thread,
        upVotesBy: isAlreadyUpVoted
          ? removeVote(thread.upVotesBy, action.payload.userId)
          : [...thread.upVotesBy, action.payload.userId],
        downVotesBy: isDownVoted
          ? removeVote(thread.downVotesBy, action.payload.userId)
          : thread.downVotesBy,
      };
    });

  case ActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) return thread;

      const isUpVoted = thread.upVotesBy.includes(action.payload.userId);
      const isAlreadyDownVoted = thread.downVotesBy.includes(
        action.payload.userId
      );

      return {
        ...thread,
        upVotesBy: isUpVoted
          ? removeVote(thread.upVotesBy, action.payload.userId)
          : thread.upVotesBy,
        downVotesBy: isAlreadyDownVoted
          ? removeVote(thread.downVotesBy, action.payload.userId)
          : [...thread.downVotesBy, action.payload.userId],
      };
    });

  case ActionType.NEUTRALIZE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) return thread;

      return {
        ...thread,
        upVotesBy: removeVote(thread.upVotesBy, action.payload.userId),
        downVotesBy: removeVote(thread.downVotesBy, action.payload.userId),
      };
    });

  default:
    return threads;
  }
};

export default threadsReducer;
