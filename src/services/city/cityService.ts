// src/services/city/cityService.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CityResponseDTO {
    propertyID: string;
    city: string;
    district: string;
}

export interface PaginateCityDTO {
    dataList: CityResponseDTO[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface CitySearchResponse {
    code: number;
    message: string;
    data: PaginateCityDTO;
}

class CityService {

    async searchCities(searchText: string = "", page: number = 0, size: number = 10): Promise<CitySearchResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}cities/search`, {
                params: {
                    searchText: searchText.trim(),
                    page,
                    size,
                },
                timeout: 10000, // 10 seconds timeout
            });

            // Validate response structure
            if (!response.data || typeof response.data.code === 'undefined') {
                throw new Error('Invalid response format from cities API');
            }

            return response.data;
        } catch (error) {
            console.error("Error fetching cities:", error);

            // Return a consistent error structure
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    return {
                        code: 404,
                        message: "Cities endpoint not found",
                        data: {
                            dataList: [],
                            totalElements: 0,
                            totalPages: 0,
                            currentPage: page,
                            pageSize: size
                        }
                    };
                } else if (error.code === 'ECONNABORTED') {
                    return {
                        code: 408,
                        message: "Request timeout",
                        data: {
                            dataList: [],
                            totalElements: 0,
                            totalPages: 0,
                            currentPage: page,
                            pageSize: size
                        }
                    };
                }
            }

            throw error;
        }
    }


}

// Create and export a singleton instance
const cityService = new CityService();
export default cityService;