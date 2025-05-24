import usersAPI from '../../utils/API/usersAPI';
import threadsAPI from '../../utils/API/threadsAPI';
import { getAllThreadsActionCreation } from '../threads/action';
import { getAllUsersActionCreator } from '../users/action';
import { showLoading } from 'react-redux-loading-bar';
import { hideLoading } from 'react-redux-loading-bar';

function asyncGetUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await usersAPI.getAllUsers();
      const threads = await threadsAPI.getAllThreads();

      dispatch(getAllThreadsActionCreation(threads));
      dispatch(getAllUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncGetUsersAndThreads };
