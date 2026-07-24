// services/otpVerificationService.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OTPVerificationResponse {
    success: boolean;
    data?: any;
    message: string;
    error?: string;
}

interface APIResponse {
    code: number;
    message: string;
    data: {
        token: string;
        userId: string;
    };
}

interface DecodedToken {
    sub: string;
    roles: string[];
    iat: number;
    exp: number;
}

// ---------------- Token management ----------------
export const saveToken = (token: string): void => {
    try {
        localStorage.setItem("authToken", token);
    } catch (error) {
        console.error("Failed to save token to localStorage:", error);
    }
};

export const getToken = (): string | null => {
    try {
        return localStorage.getItem("authToken");
    } catch (error) {
        console.error("Failed to get token from localStorage:", error);
        return null;
    }
};

export const removeToken = (): void => {
    try {
        localStorage.removeItem("authToken");
    } catch (error) {
        console.error("Failed to remove token from localStorage:", error);
    }
};

// ---------------- UserId management ----------------
export const saveUserId = (userId: string): void => {
    try {
        localStorage.setItem("userId", userId);
    } catch (error) {
        console.error("Failed to save userId to localStorage:", error);
    }
};

export const getUserId = (): string | null => {
    try {
        return localStorage.getItem("userId");
    } catch (error) {
        console.error("Failed to get userId from localStorage:", error);
        return null;
    }
};

// ---------------- Token helpers ----------------
export const getUserIdFromToken = (): string | null => {
    try {
        const token = getToken();
        if (!token) return null;

        const payload = token.split(".")[1];
        if (!payload) return null;

        const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        const decodedToken: DecodedToken = JSON.parse(decodedPayload);

        return decodedToken.sub || null;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const getTokenClaims = (): DecodedToken | null => {
    try {
        const token = getToken();
        if (!token) return null;

        const payload = token.split(".")[1];
        if (!payload) return null;

        const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error("Failed to decode token claims:", error);
        return null;
    }
};

export const isTokenExpired = (): boolean => {
    try {
        const claims = getTokenClaims();
        if (!claims || !claims.exp) return true;

        return Date.now() >= claims.exp * 1000;
    } catch (error) {
        console.error("Failed to check token expiration:", error);
        return true;
    }
};

export const getUserRoles = (): string[] => {
    try {
        const claims = getTokenClaims();
        return claims?.roles || [];
    } catch (error) {
        console.error("Failed to get user roles:", error);
        return [];
    }
};

// ---------------- OTP Verification ----------------
export const verifyOTP = async (
    mobileNumber: string,
    otp: string
): Promise<OTPVerificationResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mobileNumber,
                otp,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: APIResponse = await response.json();

        if (data.code === 200 && data.data?.token && data.data?.userId) {
            // Save token & userId directly from response
            saveToken(data.data.token);
            saveUserId(data.data.userId);

            return {
                success: true,
                data: data.data,
                message: data.message || "Login successful",
            };
        } else {
            return {
                success: false,
                error: "Invalid response format",
                message: "Failed to verify OTP",
            };
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return {
            success: false,
            error: errorMessage,
            message: "Failed to verify OTP",
        };
    }
};

// ---------------- Clear all auth data ----------------
export const clearAuthData = (): void => {
    removeToken();
    try {
        localStorage.removeItem("userId");
    } catch (error) {
        console.error("Failed to clear userId:", error);
    }
};

// ---------------- Default export ----------------
export default {
    verifyOTP,
    saveToken,
    getToken,
    removeToken,
    getUserIdFromToken,
    getTokenClaims,
    isTokenExpired,
    getUserRoles,
    clearAuthData,
    saveUserId,
    getUserId,
};
