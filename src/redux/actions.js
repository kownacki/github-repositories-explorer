import {FAILURE, LOADING, SUCCESS} from './actionTypes.js';

export const startSearchForUsers = (query) => ({type: LOADING, query});
export const successSearchForUsers = (users) => ({type: SUCCESS, users});
export const failureSearchForUsers = () => ({type: FAILURE});
