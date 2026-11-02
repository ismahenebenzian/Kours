import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import Explore from '../pages/Explore';
import Domains from '../pages/Domains';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import App from '../App'

// Layout principal incluant la Navbar sur toutes les pages
const RootLayout = () => (
    <div className="w-full">
            <Outlet />
    </div>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <App /> },
            { path: '/explore', element: <Explore /> },
            { path: '/domains', element: <Domains /> },
            { path: '/how-it-works', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
]);