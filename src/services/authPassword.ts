// services/authPassword.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        userId: string;
    };
    message: string;
    error?: string;
}

export const loginWithPassword = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth/login-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return {
            success: true,
            data: data.data,
            message: data.message || 'Login successful'
        };
    } catch (error) {
        console.error('Error logging in with password:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            success: false,
            error: errorMessage,
            message: errorMessage || 'Failed to login'
        };
    }
};

interface RegisterResponse {
    success: boolean;
    message: string;
    error?: string;
}

export const registerWithPassword = async (username: string, password: string, mobileNumber: string): Promise<RegisterResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth/register-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                mobileNumber
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return {
            success: true,
            message: data.message || 'Registration successful'
        };
    } catch (error) {
        console.error('Error signing up:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            success: false,
            error: errorMessage,
            message: errorMessage || 'Failed to register'
        };
    }
};

export default { loginWithPassword, registerWithPassword };
