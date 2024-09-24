import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStytchMemberSession } from '@stytch/nextjs/b2b';

export function useAuth() {
    const { session, isInitialized } = useStytchMemberSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        if(isInitialized && session){
            setIsAuthenticated(true)
            setLoading(false)
        }else {
            router.replace("/signin")
        }
    }, []);

    return { isAuthenticated, loading };
}