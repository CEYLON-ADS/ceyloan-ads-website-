// components/AuthGuard.tsx
// components/AuthGuard.tsx
import type {ReactNode} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isVerified } from './interceptor.ts';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const location = useLocation();

    const authenticated = isAuthenticated();
    const verified = isVerified();

    // If not authenticated, redirect to login
    if (!authenticated) {
        const returnUrl = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/loginpage?returnUrl=${returnUrl}`} replace />;
    }

    // If authenticated but not verified, redirect to verification
    if (!verified) {
        return <Navigate to="/verification" replace />;
    }

    // If both authenticated and verified, allow access
    return <>{children}</>;
};

export default AuthGuard;