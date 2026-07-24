// advertisementByUserService.ts
import api from '../../interceptor/axios.ts'; // Import the configured axios instance
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface ImageUrl {
    propertyId: string;
    url: string;
}

export interface GeneralAdvertisement {
    id: any;
    propertyId: string;
    title: string;
    activeStatus: boolean;
    whatsapp: boolean;
    telegram: boolean;
    imo: boolean;
    viber: boolean;
    isFake: boolean;
    cities: string[];
    imageUrls: ImageUrl[];
    markedFakedBy: string | null;
    markedFakedAt: string | null;
    allLikes: number;
    allViews: number;
    userId: string;
    userMobileNumber: string;
    categoryId: string;
    categoryName: string;
}

export interface GeneralAdvertisementRequestDTO {
    title?: string;
    description?: string;
    price?: number;
    activeStatus?: boolean;
    whatsapp?: boolean;
    telegram?: boolean;
    imo?: boolean;
    viber?: boolean;
    cities?: string[];
    // Add other properties as needed
}

export interface ApiResponse {
    code: number;
    message: string;
    data: {
        count: number;
        dataList: GeneralAdvertisement[];
    };
}

export interface StandardResponseDTO {
    code: number;
    message: string;
    data: any | null;
}

export interface ServiceResponse {
    success: boolean;
    message: string;
    data?: {
        content: GeneralAdvertisement[];
        totalElements: number;
        totalPages: number;
        number: number;
        first: boolean;
        last: boolean;
    };
}

class AdvertisementByUserService {

    async getAdvertisementsByUserId(
        userId: string,
        page: number = 0,
        size: number = 10,
        search?: string
    ): Promise<ServiceResponse> {
        try {
            const params: any = {
                page: page.toString(),
                size: size.toString()
            };

            if (search && search.trim()) {
                params.search = search.trim();
            }

            const response = await api.get(`${API_BASE_URL}advertisements/by-user/${userId}`, {
                params
            });

            const apiResponse: ApiResponse = response.data;

            const transformedData = {
                content: apiResponse.data.dataList || [],
                totalElements: apiResponse.data.count || 0,
                totalPages: Math.ceil((apiResponse.data.count || 0) / size),
                number: page,
                first: page === 0,
                last: page >= Math.ceil((apiResponse.data.count || 0) / size) - 1
            };

            return {
                success: true,
                message: apiResponse.message,
                data: transformedData
            };

        } catch (error: any) {
            console.error('Error fetching advertisements:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch advertisements'
            };
        }
    }

    async updateAdvertisement(
        adId: string,
        updateData: GeneralAdvertisementRequestDTO
    ): Promise<StandardResponseDTO> {
        try {
            const response = await api.put(`${API_BASE_URL}advertisements/${adId}`, updateData);
            return response.data;

        } catch (error: any) {
            console.error('Error updating advertisement:', error);
            throw new Error(error.response?.data?.message || error.message || 'Failed to update advertisement');
        }
    }

    async deleteAdvertisement(adId: string): Promise<StandardResponseDTO> {
        try {
            const response = await api.delete(`${API_BASE_URL}advertisements/${adId}`);

            if (response.status === 204) {
                return {
                    code: 204,
                    message: 'Advertisement deleted successfully',
                    data: null
                };
            }

            return response.data;

        } catch (error: any) {
            console.error('Error deleting advertisement:', error);
            throw new Error(error.response?.data?.message || error.message || 'Failed to delete advertisement');
        }
    }

    // Optional bulk deletion method
    async deleteMultipleAdvertisements(adIds: string[]): Promise<StandardResponseDTO> {
        try {
            const response = await api.delete(`${API_BASE_URL}advertisements/bulk`, {
                data: { ids: adIds }
            });

            if (response.status === 204) {
                return {
                    code: 204,
                    message: 'Advertisements deleted successfully',
                    data: null
                };
            }

            return response.data;

        } catch (error: any) {
            console.error('Error deleting multiple advertisements:', error);
            throw new Error(error.response?.data?.message || error.message || 'Failed to delete advertisements');
        }
    }
}

const advertisementByUserService = new AdvertisementByUserService();
export default advertisementByUserService;