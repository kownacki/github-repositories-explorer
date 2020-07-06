import {FAILURE_USERS, LOADING_REPOS, LOADING_USERS, SUCCESS_USERS, SUCCESS_REPOS, FAILURE_REPOS} from './actionTypes.js';

export const startSearchForUsers = (query) => ({type: LOADING_USERS, query});
export const successSearchForUsers = (users) => ({type: SUCCESS_USERS, users});
export const failureSearchForUsers = () => ({type: FAILURE_USERS});
export const startFetchRepos = (userID) => ({type: LOADING_REPOS, userID});
export const successFetchRepos = (userID, repos) => ({type: SUCCESS_REPOS, userID, repos});
export const failureFetchRepos = (userID) => ({type: FAILURE_REPOS, userID});
