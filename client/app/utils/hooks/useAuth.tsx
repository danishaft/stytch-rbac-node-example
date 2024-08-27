import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie'
import api from "../api";

export function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const isCheckingAuth = useRef(false);

    let logout = useCallback(() => {
        // Cookies.remove('session_jwt')
        setIsAuthenticated(false);
        router.replace('/sign-in');
    }, [router])

    const checkAuth = useCallback(async () => {
        if (isCheckingAuth.current) return;
        isCheckingAuth.current = true;
        try {
            console.log('sending req')
            const response = await api.post('/auth/check-auth-status');
            console.log(response)
            const { authenticated, session_token} = response.data;
            console.log(authenticated)
            if (authenticated) {
                Cookies.set('session_token', session_token)
                api.defaults.headers.common['x-session-token'] = session_token;
                let sessionToken = Cookies.get('session-token')
                console.log('sessionToken', sessionToken)
                setIsAuthenticated(true);
            } else {
                console.log('logout')
                logout()
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            logout()
        } finally {
            setLoading(false);
        }
    }, [logout])

    useEffect(() => {
        checkAuth();
        // Refresh JWT every 3 minutes
        const intervalId = setInterval(checkAuth, 3 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [checkAuth]);

    return { isAuthenticated, loading };
}