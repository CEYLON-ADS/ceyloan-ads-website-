// advertisementService.ts

import type { AxiosResponse } from 'axios';
import { getToken, getUserId } from '../verifyOTP.ts';
import api from '../../interceptor/axios.ts'; // Import the axios instance

// API endpoint from environment variables
const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;

// Type definitions
interface GeneralAdvertisementRequestData {
    title: string;
    whatsapp: boolean;
    telegram: boolean;
    viber: boolean;
    imo: boolean;
    categoryID: string;
    cityIds?: string[];
    userId: string;
    adType: string;
    description: string;
    serviceFee: number;
    verify: boolean;
    images: File[] | FileList;
}

interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

interface ServiceResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message: string;
    status?: number;
}

class GeneralAdvertisementService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = API_ENDPOINT || '';

        if (!this.baseUrl) {
            console.warn('VITE_API_BASE_URL environment variable is not set');
        }
    }

    private getAuthHeaders(): { [key: string]: string } {
        const token = getToken();
        const headers: { [key: string]: string } = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    async createAdvertisement(
        advertisementData: GeneralAdvertisementRequestData,
    ): Promise<ServiceResponse<ApiResponse>> {
        try {
            if (!this.baseUrl) {
                throw new Error('API endpoint is not configured. Please check VITE_API_BASE_URL environment variable.');
            }

            const formData = new FormData();

            // Append all fields
            formData.append('title', advertisementData.title);
            formData.append('whatsapp', advertisementData.whatsapp.toString());
            formData.append('telegram', advertisementData.telegram.toString());
            formData.append('viber', advertisementData.viber.toString());
            formData.append('imo', advertisementData.imo.toString());
            formData.append('categoryID', advertisementData.categoryID);
            formData.append('userId', advertisementData.userId);
            formData.append('adType', advertisementData.adType);
            formData.append('description', advertisementData.description);
            formData.append('verify', advertisementData.verify.toString());
            formData.append('serviceFee', advertisementData.serviceFee.toString());

            // Append city IDs if provided
            if (advertisementData.cityIds && advertisementData.cityIds.length > 0) {
                advertisementData.cityIds.forEach((cityId: string) => {
                    formData.append('cityIds', cityId);
                });
            }

            // Append images
            if (advertisementData.images && advertisementData.images.length > 0) {
                const imageFiles = Array.from(advertisementData.images);
                imageFiles.forEach((file: File) => {
                    formData.append('images', file);
                });
            }

            // Get authentication headers with token
            const headers = {
                ...this.getAuthHeaders(),
                'Content-Type': 'multipart/form-data',
            };

            const response: AxiosResponse<ApiResponse> = await api.post(
                `advertisements`,
                formData,
                {
                    headers: headers,
                }
            );

            return {
                success: true,
                data: response.data,
                message: response.data.message || 'Advertisement created successfully'
            };

        } catch (error: any) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to create advertisement';

            // Handle unauthorized errors
            if (error.response?.status === 401 || error.response?.status === 403) {
                return {
                    success: false,
                    error: 'Authentication required. Please login again.',
                    message: 'Authentication failed',
                    status: error.response?.status
                };
            }

            return {
                success: false,
                error: errorMessage,
                message: 'Failed to create advertisement',
                status: error.response?.status
            };
        }
    }

    // Add method to check if user is authenticated
    isAuthenticated(): boolean {
        return !!getToken();
    }

    // Add method to get user ID
    getCurrentUserId(): string | null {
        return getUserId();
    }

    // Additional method: Get all advertisements
    async getAllAdvertisements(page: number = 0, size: number = 10): Promise<ServiceResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await api.get(
                `advertisements/search?page=${page}&size=${size}`
            );

            return {
                success: true,
                data: response.data,
                message: 'Advertisements fetched successfully'
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Failed to fetch advertisements';

            return {
                success: false,
                error: errorMessage,
                message: 'Failed to fetch advertisements',
                status: error.response?.status
            };
        }
    }

    // Additional method: Get advertisement by ID
    async getAdvertisementById(id: string): Promise<ServiceResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await api.get(
                `advertisements/${id}`
            );

            return {
                success: true,
                data: response.data,
                message: 'Advertisement fetched successfully'
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Failed to fetch advertisement';

            return {
                success: false,
                error: errorMessage,
                message: 'Failed to fetch advertisement',
                status: error.response?.status
            };
        }
    }
}

// Create and export a singleton instance
const generalAdvertisementService = new GeneralAdvertisementService();
export default generalAdvertisementService;

// Export types
export type {
    GeneralAdvertisementRequestData,
    ApiResponse,
    ServiceResponse
};