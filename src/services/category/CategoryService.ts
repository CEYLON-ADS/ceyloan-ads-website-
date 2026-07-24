// src/services/category/categoryService.ts
import api from '../../interceptor/axios.ts'; // Import your existing axios instance

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface CategoryResponseDTO {
    propertyId: string;
    categoryName: string;
    activeStatus: boolean;
}

export interface PaginateCategoryDTO {
    count: number;
    dataList: CategoryResponseDTO[];
}

export interface StandardResponseDTO<T = any> {
    code: number;
    message: string;
    data: T;
}

class CategoryService {
    async getAllCategories(page: number = 0, size: number = 100): Promise<StandardResponseDTO<PaginateCategoryDTO>> {
        try {
            const response = await api.get(`${API_BASE_URL}categories/search`, {
                params: {
                    page,
                    size
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }
}

const categoryService = new CategoryService();
export default categoryService;