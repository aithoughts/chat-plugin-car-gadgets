interface CacheEntry<T> {
    timestamp: number;
    data: T;
}

class StatCache<T> {
    private data: Record<string, CacheEntry<T>>;
    private maxAge: number;

    constructor(maxAge = 1000 * 60 * 60 * 24) {  // Default to 1 days
        this.data = {};
        this.maxAge = maxAge;
    }

    get(key: string): T | null {
        const entry = this.data[key];

        if (!entry) {
            return null;
        }
        console.log(`Getting ${key} from cache...`);
        if (Date.now() - entry.timestamp > this.maxAge) {
            delete this.data[key];
            console.log(`Cache entry for ${key} expired.`)
            return null;
        }

        return entry.data;
    }

    set(key: string, value: T): void {
        console.log(`Setting ${key} in cache...`);
        this.data[key] = {
            timestamp: Date.now(),
            data: value,
        };
    }
}

const makeCache = new StatCache<makeStats>()
const brandCache = new StatCache<StargazerResult>()

export { makeCache, brandCache }
