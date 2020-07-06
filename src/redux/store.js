import {createStore} from 'redux';
import {NONE, LOADING_USERS, SUCCESS_USERS, FAILURE_USERS, LOADING_REPOS, SUCCESS_REPOS, FAILURE_REPOS} from './actionTypes.js';

const initialState = {
  usersStatus: NONE,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_USERS:
      return {
        usersStatus: LOADING_USERS,
        query: action.query,
      };
    case SUCCESS_USERS:
      return {
        usersStatus: SUCCESS_USERS,
        users: action.users,
        query: state.query,
      };
    case FAILURE_USERS:
      return {
        usersStatus: FAILURE_USERS,
      };
    case LOADING_REPOS: {
      return {
        ...state,
        users: state.users.map((user) => user.id === action.userID ? {
          ...user,
          reposStatus: LOADING_REPOS,
        } : user),
      }
    }
    case SUCCESS_REPOS: {
      return {
        ...state,
        users: state.users.map((user) => user.id === action.userID ? {
          ...user,
          reposStatus: SUCCESS_REPOS,
          repos: action.repos
        } : user),
      }
    }
    case FAILURE_REPOS: {
      return {
        ...state,
        users: state.users.map((user) => user.id === action.userID ? {
          ...user,
          reposStatus: FAILURE_REPOS,
        } : user),
      }
    }
    default:
      return state;
  }
}

export default createStore(appReducer);
