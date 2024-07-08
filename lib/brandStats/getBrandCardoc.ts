export async function getBrandCardoc(owner: string, repo: string): Promise<string> {
  const branches = ['main', 'master', 'default'];

  for (const branch of branches) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/CARDOC.md`;
    const response = await fetch(url);

    if (response.ok) {
      const cardocData = await response.text();
      // Limit the CARDOC to 8KB
      return cardocData.slice(0, 2048 * 4); 
    }
  }

  return "CARDOC not found on “base” branch in the repository.";
}