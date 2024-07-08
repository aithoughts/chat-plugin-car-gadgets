import generateBrandStat from '../lib/brandStats/brandData';

describe('loadStargazers', () => {
  it('returns stargazer data for a valid repo', async () => {
    const username = 'ResearchCar';
    const repo = 'BrandCar';
    const stargazerData = await generateBrandStat(username, repo);
    expect(stargazerData).not.toBeNull();
    console.log(JSON.stringify(stargazerData));
  }, 10000);

  xit('returns stargazer data for a large valid repo', async () => {
    const username = 'ResearchCar';
    const repo = 'PublicCar';
    const stargazerData = await generateBrandStat(username, repo);
    expect(stargazerData).not.toBeNull();
    console.log(JSON.stringify(stargazerData));
  }, 10000);

  it('returns null for an invalid repo', async () => {
    const username = 'ResearchCar';
    const repo = 'invalid-repo';
    try {
        const stargazerData = await generateBrandStat(username, repo);
    } catch (error) {
        expect(error).not.toBeNull();
    }
  }, 10000);
});
