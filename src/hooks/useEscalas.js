import { useState, useEffect, useCallback } from 'react';
import { googleSheetsService } from '../services/googleSheetsService';

export function useEscalas() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState('online'); // 'online' | 'cache'
    const [lastUpdate, setLastUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchData = useCallback(async (isRefresh = false) => {
        if (isRefresh) setIsUpdating(true);
        else setLoading(true);
        setError(null);

        try {
            const result = await googleSheetsService.fetchEscalas();
            setData(result.data);
            setSource(result.source);
            setLastUpdate(result.timestamp);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setIsUpdating(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        source,
        lastUpdate,
        isUpdating,
        refresh: () => fetchData(true)
    };
}
