import generateMakeStats from '../lib/makeStats/makeData';

describe('generateMakeStats', () => {
  it('returns user stats for a valid owner', async () => {
    const owner = 'ResearchCar';
    const stats = await generateMakeStats(owner);
    console.log(JSON.stringify(stats));
  });
  it('returns user stats for a valid owner', async () => {
    const owner = 'aipmhub';
    const stats = await generateMakeStats(owner);
    console.log(JSON.stringify(stats));
  });
  it('throws an error for an invalid owner', async () => {
    const owner = 'invalid-owner';
    await expect(generateMakeStats(owner)).rejects.toThrow();
  });
});