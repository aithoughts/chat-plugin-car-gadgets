import { getBrandCardoc } from '../lib/brandStats/getBrandCardoc';

describe('getBrandCardoc', () => {
  it('returns the CARDOC data for a valid repo', async () => {

    const cardocData = await getBrandCardoc('ResearchCar', 'ResearchCar.github.io');
    console.log(cardocData);
  });

  it('throws an error if the CARDOC is not found on the default branches', async () => {
    const owner = 'ResearchCar';
    const repo = 'invalid-repo';
    try {
      const cardocData = await getBrandCardoc(owner, repo);
    }
    catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
