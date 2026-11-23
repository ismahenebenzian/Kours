import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import Explore from '../pages/Explore';
import Domains from '../pages/Domains';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import App from '../App';
import ProtectedRoute from './ProtectedRoute';

// Imports pour le Dashboard
import DashboardLayout from '../pages/Dashboard'; // Ton composant modifié ci-dessus
import DashHome from '../components/Dashboard/Home/Dash-home';
import MesCours from '../components/Dashboard/MesCours/MesCours';
import Notes from '../components/Dashboard/Notes/Note';
import EspacesPrives from '../components/Dashboard/EspacePrive/EspacesPrive';
import Quiz from '../components/Dashboard/Quiz/Quiz';
import Profile from '../components/Dashboard/Home/Profile';
import CourseDetail from '../pages/CoursDetail';
import ExploreList from '../components/Dashboard/explore/ExploreList';

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
            { path: '/auth', element: <Auth isLogin={true} /> },
            { path: '/register', element: <Auth isLogin={false} /> },

            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/dashboard',
                        element: <DashboardLayout />,
                        children: [
                            { index: true, element: <DashHome /> },
                            { path: 'mes-cours', element: <MesCours /> },
                            { path: 'notes', element: <Notes /> },
                            { path: 'espaces-prives', element: <EspacesPrives /> },
                            { path: 'explorer', element: <ExploreList /> }, 
                            
                            { path: 'quiz', element: <Quiz /> },
                            { path: 'profil', element: <Profile /> },
                            { path: 'cours/:id', element: <CourseDetail /> },
                        ],
                    },
                ],
            },
        ],
    },
]);