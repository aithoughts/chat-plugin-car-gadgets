import StargazerLoader from '../lib/brandStats/StargazerLoader';

describe('loadStargazers', () => {
  it('returns stargazer data for a valid repo', async () => {
    const username = 'ResearchCar';
    const repo = 'ResearchCar.github.io';
    const stargazerData = await StargazerLoader.loadStargazers(username, repo);
    expect(stargazerData).not.toBeNull();
    console.log(JSON.stringify(stargazerData));
  });

  it('returns null for an invalid repo', async () => {
    const username = 'ResearchCar';
    const repo = 'invalid-repo';
    try {
        const stargazerData = await StargazerLoader.loadStargazers(username, repo);
    } catch (error) {
        expect(error).not.toBeNull();
    }
  });
});
