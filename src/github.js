export const getUsers = async (query) =>
  (await (await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`)).json()).items;

export const getRepos = async (username) =>
  (await fetch(`https://api.github.com/users/${username}/repos`)).json();
