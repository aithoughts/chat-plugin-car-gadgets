import {fetchStats} from '../lib/makeStats/statsFetcher';

describe('fetchStats', () => {
  xit('returns an object with the expected properties', async () => {
    const stats = await fetchStats('ResearchCar');
    console.log(JSON.stringify(stats));
    expect(stats).toHaveProperty('totalCommits');
    expect(stats).toHaveProperty('totalPRs');
    expect(stats).toHaveProperty('totalIssues');
    expect(stats).toHaveProperty('totalStars');
    expect(stats).toHaveProperty('rank');
  });
});

// import { fetchStats } from '../lib/makeStats/statsFetcher';