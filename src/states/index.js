import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import { configureStore } from '@reduxjs/toolkit';
import {
  loadingBarReducer,
  loadingBarMiddleware,
} from 'react-redux-loading-bar';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()),
});

export default store;
