// utils/authInterceptors.ts
import Cookies from 'js-cookie';

const isSecure = () => {
    return window.location.protocol === 'https:';
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken') ||
        Cookies.get('authToken');
    return !!token;
};

// Check if user is verified
export const isVerified = (): boolean => {
    const verified = localStorage.getItem('isVerified') === 'true' ||
        Cookies.get('isVerified') === 'true';
    return verified;
};

// Clear auth data
export const clearAuthData = () => {
    // Clear cookies
    Cookies.remove('authToken', { path: '/', domain: isSecure() ? undefined : undefined });
    Cookies.remove('isVerified', { path: '/', domain: isSecure() ? undefined : undefined });

    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('isVerified');

    // Clear sessionStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('isVerified');
};

// Login function
export const login = (token: string, isVerified: boolean = false) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isVerified', isVerified.toString());

    Cookies.set('authToken', token, {
        secure: isSecure(),
        sameSite: 'strict',
        expires: 7
    });
    Cookies.set('isVerified', isVerified.toString(), {
        secure: isSecure(),
        sameSite: 'strict',
        expires: 7
    });
};

// Verify user function
export const verifyUser = () => {
    localStorage.setItem('isVerified', 'true');
    Cookies.set('isVerified', 'true', {
        secure: isSecure(),
        sameSite: 'strict',
        expires: 7
    });
};

// Logout function
export const logout = () => {
    clearAuthData();
    window.location.href = '/loginpage';
};

// Get user roles from JWT token
export const getUserRoles = (): string[] => {
    const token = localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken') ||
        Cookies.get('authToken');
    if (!token) return [];

    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return [];
        const decodedJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(decodedJson);
        return payload.roles || [];
    } catch (e) {
        console.error("Failed to decode JWT roles:", e);
        return [];
    }
};

// Check if user is an Ads Agent
export const isAdsAgent = (): boolean => {
    const roles = getUserRoles();
    return roles.includes('ADS_AGENT');
};

// Get Primary User Role
export const getUserPrimaryRole = (): 'ADMIN' | 'ADS_AGENT' | 'PUBLIC_USER' => {
    const roles = getUserRoles();
    if (roles.includes('ADMIN')) return 'ADMIN';
    if (roles.includes('ADS_AGENT')) return 'ADS_AGENT';
    return 'PUBLIC_USER';
};