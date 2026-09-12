const CACHE_KEY = "dejem_data_cache";
const CACHE_TIMESTAMP_KEY = "dejem_data_timestamp";

export const cacheService = {
    saveData(data) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
        } catch (e) {
            console.error("Failed to save data to cache", e);
        }
    },
    
    getData() {
        try {
            const data = localStorage.getItem(CACHE_KEY);
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            if (data && timestamp) {
                return {
                    data: JSON.parse(data),
                    timestamp: new Date(timestamp)
                };
            }
        } catch (e) {
            console.error("Failed to retrieve data from cache", e);
        }
        return null;
    }
};
