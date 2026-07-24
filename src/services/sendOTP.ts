// services/otpService.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OTPResponse {
    success: boolean;
    data?: any;
    message: string;
    error?: string;
}

export const sendOTP = async (mobileNumber: string): Promise<OTPResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileNumber: mobileNumber
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data,
            message: data.message || 'OTP sent successfully'
        };
    } catch (error) {
        console.error('Error sending OTP:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            success: false,
            error: errorMessage,
            message: 'Failed to send OTP'
        };
    }
};

export default { sendOTP };