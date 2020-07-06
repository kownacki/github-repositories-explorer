import {createStore} from 'redux';
import {NONE, LOADING, SUCCESS, FAILURE} from './actionTypes.js';

const initialState = {
  type: NONE,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        type: LOADING,
        query: action.query,
      };
    case SUCCESS:
      return {
        type: SUCCESS,
        users: action.users,
        query: state.query,
      };
    case FAILURE:
      return {
        type: FAILURE,
      };
    default:
      return state;
  }
}

export default createStore(appReducer);
