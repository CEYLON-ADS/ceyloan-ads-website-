// src/services/advertiseType/advertiseTypeService.ts
import api from '../../interceptor/axios.ts'; // Import your existing axios instance

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AdvertiseTypeResponseDTO {
    propertyId: string;
    type: string;
    price: number;
}

export interface StandardResponseDTO<T = any> {
    code: number;
    message: string;
    data: T;
}

class AdvertiseTypeService {
    async getAllAdvertiseTypes(): Promise<StandardResponseDTO<AdvertiseTypeResponseDTO[]>> {
        try {
            // Use the base URL with the relative endpoint
            const response = await api.get(`${API_BASE_URL}advertise-types`);
            return response.data;
        } catch (error) {
            console.error("Error fetching advertise types:", error);
            throw error;
        }
    }
}

const advertiseTypeService = new AdvertiseTypeService();
export default advertiseTypeService;