import { showLoading } from 'react-redux-loading-bar';
import usersAPI from '../../utils/API/usersAPI';
import { hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

const leaderboardActionCreator = (leaderboards) => {
  return {
    type: ActionType.GET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
};

const asyncGetLeaderboards = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await usersAPI.getUserLeaderboard();

      dispatch(leaderboardActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export { ActionType, asyncGetLeaderboards };
