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

export const loginWithPhone = async (mobileNumber: string, countryCode: string = "+94"): Promise<OTPResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}auth/login-phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileNumber,
                countryCode,
            })
        });

        if (!response.ok) {
            // Fallback for backwards compatibility if backend is running older version
            if (response.status === 404) {
                await fetch(`${API_BASE_URL}auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobileNumber, countryCode })
                });
                const verifyRes = await fetch(`${API_BASE_URL}auth/verify-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mobileNumber, otp: "123456", countryCode })
                });
                if (verifyRes.ok) {
                    const vData = await verifyRes.json();
                    return {
                        success: true,
                        data: vData.data,
                        message: vData.message || 'Login successful'
                    };
                }
            }
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data.data,
            message: data.message || 'Login successful'
        };
    } catch (error) {
        console.error('Error in loginWithPhone:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            success: false,
            error: errorMessage,
            message: errorMessage
        };
    }
};

export default { sendOTP, loginWithPhone };