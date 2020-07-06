export const getUsers = async (query) => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
  return response.status === 200 ? (await response.json()).items : false;
};

export const getRepos = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  return response.status === 200 ? await response.json() : false;
};
