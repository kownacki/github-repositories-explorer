import * as github from './github.js';

const spyOnFetch = (type, resolveValue) => {
  return jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve(type === 'rejecting'
      ? {
        status: 403 ,
      }
      : {
        status: 200,
        json: () => Promise.resolve(resolveValue),
      }
    )
  );
};

describe('github', () => {
  afterEach(() => {
    global.fetch.mockRestore();
  });

  describe('getUsers', () => {
    it('returns users', async () => {
      const usersStub = [];
      spyOnFetch('resolving', {items: usersStub});
      await expect(github.getUsers()).resolves.toBe(usersStub);
    });

    it('returns false when fetch failed', async () => {
      spyOnFetch('rejecting');
      await expect(github.getUsers()).resolves.toBe(false);
    });
  });

  describe('getRepos', () => {
    it('returns repos', async () => {
      const usersRepos = [];
      spyOnFetch('resolving', usersRepos);
      await expect(github.getRepos()).resolves.toBe(usersRepos);
    });

    it('returns false when fetch failed', async () => {
      spyOnFetch('rejecting');
      await expect(github.getRepos()).resolves.toBe(false);
    });
  });
});
