import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../pages/home';
import Explore from '../pages/Explore';
import Domains from '../pages/Domains';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

// Layout principal incluant la Navbar sur toutes les pages
const RootLayout = () => (
    <div className="w-100% flex flex-col">
            <Outlet />
    </div>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/explore', element: <Explore /> },
            { path: '/domains', element: <Domains /> },
            { path: '/how-it-works', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
]);