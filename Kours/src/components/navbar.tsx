import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';


export default function Navbar() {
    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `hover:text-amber-400 transition-colors ${isActive ? 'text-amber-400 font-semibold' : 'text-white'
        }`;

    return (
        <nav className="sticky bg-gradient-to-r from-[#0B1440] via-[#1B2E8F] to-[#2F5BEA] top-0 z-50 flex w-full items-center justify-between  px-8 py-4 text-white shadow-md">            
            <Logo />
            {/* Liens centraux */}
            <div className="flex items-center gap-8 text-sm">
                <NavLink to="/explore" className={linkStyle}>
                    Explorer
                </NavLink>
                <NavLink to="/domains" className={linkStyle}>
                    Domaine
                </NavLink>
                <NavLink to="/how-it-works" className={linkStyle}>
                    Comment ça marche
                </NavLink>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center gap-4 text-sm">
                <Link
                    to="/Auth"
                    className="px-5 py-2 rounded-lg border border-white/40 hover:bg-white/10 transition-colors"
                >
                    Se connecter
                </Link>
                <Link
                    to="/register"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold transition-colors"
                >
                    Créer un compte
                </Link>
            </div>
        </nav>
    );
}