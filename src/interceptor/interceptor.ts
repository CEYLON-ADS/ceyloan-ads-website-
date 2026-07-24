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