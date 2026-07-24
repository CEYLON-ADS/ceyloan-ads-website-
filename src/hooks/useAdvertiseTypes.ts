// src/hooks/useAdvertiseTypes.ts
import { useState, useEffect, useCallback } from 'react';
import advertiseTypeService, { type AdvertiseTypeResponseDTO } from '../services/adType/adTypeService.ts';

interface UseAdvertiseTypesState {
    advertiseTypes: AdvertiseTypeResponseDTO[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useAdvertiseTypes = (): UseAdvertiseTypesState => {
    const [advertiseTypes, setAdvertiseTypes] = useState<AdvertiseTypeResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAdvertiseTypes = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await advertiseTypeService.getAllAdvertiseTypes();

            if (response.code === 200) {
                setAdvertiseTypes(response.data);
            } else {
                setError(response.message || 'Failed to fetch advertise types');
                setAdvertiseTypes([]);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            setAdvertiseTypes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdvertiseTypes();
    }, [fetchAdvertiseTypes]);

    return {
        advertiseTypes,
        loading,
        error,
        refetch: fetchAdvertiseTypes,
    };
};