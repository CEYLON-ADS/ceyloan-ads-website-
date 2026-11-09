// components/AuthGuard.tsx
// components/AuthGuard.tsx
import type {ReactNode} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './interceptor.ts';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const location = useLocation();

    const authenticated = isAuthenticated();

    // If not authenticated, redirect to login
    if (!authenticated) {
        const returnUrl = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/loginpage?returnUrl=${returnUrl}`} replace />;
    }

    // Allow access once authenticated without OTP verification
    return <>{children}</>;
};

export default AuthGuard;