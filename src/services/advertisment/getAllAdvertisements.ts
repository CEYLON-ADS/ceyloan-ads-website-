// services/advertisementService.ts
import api from '../../interceptor/axios.ts'; // Import your existing axios instance

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AdvertisementImage {
    propertyId: string;
    url: string;
}

export interface Advertisement {
    propertyId: string;
    title: string;
    description?: string;
    price?: number;
    location?: string;
    activeStatus: boolean;
    whatsapp: boolean;
    telegram: boolean;
    imo: boolean;
    viber: boolean;
    isFake: boolean;
    cities: string[];
    imageUrls: AdvertisementImage[];
    markedFakedBy: string | null;
    markedFakedAt: string | null;
    allLikes: number;
    allViews: number;
    userId: string;
    userMobileNumber: string;
    categoryId: string;
    categoryName: string;
    fakeCount: number;
    user?: {
        id: string;
        username: string;
    };
    createdDate?: string;
}

export interface PaginatedAdvertisementResponse {
    count: number;
    dataList: Advertisement[];
}

export interface StandardResponseDTO<T = any> {
    code: number;
    message: string;
    data: T;
}

/**
 * Search advertisements by category with optional search text
 * @param {string} categoryId - Category ID to search by
 * @param {string} searchText - Optional search text to filter by title/description
 * @param {number} page - Page number (default: 0)
 * @param {number} size - Page size (default: 10)
 * @returns {Promise<PaginatedAdvertisementResponse>} Promise with paginated advertisement data
 */
export const searchAdvertisementsByCategory = async (
    categoryId: string,
    searchText: string = '',
    page: number = 0,
    size: number = 10
): Promise<PaginatedAdvertisementResponse> => {
    try {
        const params: Record<string, string> = {
            page: page.toString(),
            size: size.toString()
        };

        // Only add searchText if it's provided
        if (searchText) {
            params.searchText = searchText;
        }

        const response = await api.get(`${API_BASE_URL}advertisements/search/by-category/${categoryId}`, {
            params
        });

        const data: StandardResponseDTO<PaginatedAdvertisementResponse> = response.data;

        if (data.code !== 200) {
            throw new Error(data.message || 'Failed to fetch advertisements by category');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching advertisements by category:', error);
        throw error;
    }
};

/**
 * Get single advertisement by ID
 * @param {string} adId - Advertisement UUID
 * @returns {Promise<Advertisement>} Promise with advertisement data
 */
export const getAdvertisementById = async (adId: string): Promise<Advertisement> => {
    try {
        const response = await api.get(`${API_BASE_URL}advertisements/${adId}`);
        const data: StandardResponseDTO<Advertisement> = response.data;

        if (data.code !== 200) {
            throw new Error(data.message || 'Failed to fetch advertisement');
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching advertisement by ID:', error);
        throw error;
    }
};