import usersAPI from '../../utils/API/usersAPI';

const ActionType = {
  GET_ALL_USERS: 'GET_ALL_USERS',
};

const getAllUsersActionCreator = (users) => {
  return {
    type: ActionType.GET_ALL_USERS,
    payload: {
      users,
    },
  };
};

const asyncRegisterUser = ({ name, email, password }) => {
  return async () => {
    try {
      await usersAPI.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
};

export { ActionType, getAllUsersActionCreator, asyncRegisterUser };
