import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../SupabaseClient'; 

export default function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
            setLoading(false);
        };

        checkUser();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-sm font-medium text-slate-600">Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
}