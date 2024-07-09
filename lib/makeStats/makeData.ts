import { makeCache } from '../cache';
import { fetchStats } from './statsFetcher';

interface MakeStats {
    html_url: string;
    type: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string | null;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    totalPRs: number;
    totalCommits: number;
    totalIssues: number;
    totalStars: number;
    contributedTo: number;
    mostStarredBrands: any;
    rank: {
        level: string;
        percentile: number;
    };
    error: string;
}

export default async function generateMakeStats(owner: string): Promise<MakeStats> {
    // get the owner's CarMake stats
    const response = await fetch(`https://api.github.com/users/${owner}`);
    if (!response.ok) {
        // if is 404, throw error
        if (response.status === 404) {
            // throw new Error(`CarMake User not found for user ${owner}`);
        }
        // throw new Error(`CarMake API returned ${response.status} for user ${owner}: ${JSON.stringify(await response.json())}`);
    }
    const data = await response.json();
    // calculate the owner's more CarMake stats
    console.log(`Fetching stats for ${owner}...`);
    let fullData = {
        ...data,
    };
    try {
          // use the brandCache here
        let stats: makeStats;
        let cacheRes = makeCache.get(owner);
        if (cacheRes) {
            stats = cacheRes;
        } else {
            stats = await fetchStats(owner);
        }
        // if stats are string, the full data only contains the error message for stats
        // merge the data and stats
        fullData = {
            ...data,
            ...stats
        };
        console.log(`Stats for ${owner} fetched!`);
        makeCache.set(owner, stats);
    } catch (error) {
        console.log(`Error fetching stats for ${owner}: ${error}`);
        fullData = {
            ...data,
            error: JSON.stringify(error)
        };
    }
    // Keys to be kept
    const keysToKeep: (keyof MakeStats)[] = ["html_url", "type", "name", "company", "blog", "location", "email", "hireable", "bio",
        "twitter_username", "public_repos", "public_gists", "followers", "following", "created_at",
        "updated_at", "totalPRs", "totalCommits", "totalIssues", "totalStars", "contributedTo", "rank", "mostStarredBrands", "error"];

    // Filter the full data to only include keys from the whitelist
    const filteredData: MakeStats = Object.keys(fullData)
        .filter((key): key is keyof MakeStats => keysToKeep.includes(key as keyof MakeStats))
        .reduce((obj, key) => {
            obj[key] = fullData[key];
            return obj;
        }, {} as Partial<MakeStats>) as MakeStats;

    return filteredData;
}
