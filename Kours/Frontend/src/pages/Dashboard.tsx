import { useState, useRef } from "react";
import { 
    BellIcon, 
    BookIcon, 
    FileQuestionMarkIcon, 
    HomeIcon, 
    LockIcon, 
    NotepadTextDashedIcon, 
    SearchIcon, 
    Menu, 
    X 
} from "lucide-react";
import { NavLink, Outlet, Link } from "react-router-dom";
import Logo from "../components/Logo";
import background from "../assets/Dashboard/background.svg";
import { ShareCourseButton } from "../components/Dashboard/Home/CTA-btn";

export default function Dashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    // Gestion du swipe pour fermer le menu vers la droite
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        // Si l'utilisateur a balayé vers la droite d'au moins 50 pixels
        if (touchEndX.current - touchStartX.current > 50) {
            setIsMobileMenuOpen(false);
        }
    };

    // Style des liens pour le desktop
    const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm shadow-sm w-full transition-colors ${
            isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"
        }`;

    // Style des liens dans le menu mobile coulissant à droite (uniquement icônes + texte épuré)
    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
            isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"
        }`;

    return (
        <div className="min-h-screen w-full bg-slate-50 flex overflow-hidden">
            
            {/* 1. SIDEBAR DESKTOP (cachée sur mobile) */}
            <aside className="w-70 bg-slate-900 text-slate-300 flex-col justify-between p-6 shrink-0 hidden md:flex">
                <div className="space-y-6">
                    <Logo />
                    <nav className="space-y-1.5">
                        <NavLink to="/dashboard" end className={desktopNavLinkClass}>
                            <HomeIcon className="w-4 h-4" />
                            <span>Accueil</span>
                        </NavLink>
                        <NavLink to="/dashboard/mes-cours" className={desktopNavLinkClass}>
                            <BookIcon className="w-4 h-4" />
                            <span>Mes cours</span>
                        </NavLink>
                        <NavLink to="/dashboard/notes" className={desktopNavLinkClass}>
                            <NotepadTextDashedIcon className="w-4 h-4" />
                            <span>Notes</span>
                        </NavLink>
                        <NavLink to="/dashboard/espaces-prives" className={desktopNavLinkClass}>
                            <LockIcon className="w-4 h-4" />
                            <span>Espaces privés</span>
                        </NavLink>
                        <NavLink to="/dashboard/explorer" className={desktopNavLinkClass}>
                            <SearchIcon className="w-4 h-4" />
                            <span>Explorer</span>
                        </NavLink>
                        <NavLink to="/dashboard/quiz" className={desktopNavLinkClass}>
                            <FileQuestionMarkIcon className="w-4 h-4" />
                            <span>Quiz</span>
                        </NavLink>
                    </nav>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <span><img src={background} alt="" /></span>
                    <span><ShareCourseButton /></span>
                </div>
            </aside>

            {/* 1.5. SIDEBAR MOBILE (Panneau coulissant depuis la DROITE) */}
            <div 
                className={`fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex justify-end md:hidden transition-opacity duration-300 ease-in-out ${
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div 
                    className={`w-72 bg-slate-900 text-slate-300 flex flex-col p-6 h-full shadow-2xl transition-transform duration-300 ease-out transform ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                        <span className="text-sm font-bold text-white tracking-wider uppercase">Menu</span>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                            aria-label="Fermer le menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-2 mt-6" onClick={() => setIsMobileMenuOpen(false)}>
                        <NavLink to="/dashboard" end className={mobileNavLinkClass}>
                            <HomeIcon className="w-5 h-5" />
                            <span>Accueil</span>
                        </NavLink>
                        <NavLink to="/dashboard/mes-cours" className={mobileNavLinkClass}>
                            <BookIcon className="w-5 h-5" />
                            <span>Mes cours</span>
                        </NavLink>
                        <NavLink to="/dashboard/notes" className={mobileNavLinkClass}>
                            <NotepadTextDashedIcon className="w-5 h-5" />
                            <span>Notes</span>
                        </NavLink>
                        <NavLink to="/dashboard/espaces-prives" className={mobileNavLinkClass}>
                            <LockIcon className="w-5 h-5" />
                            <span>Espaces privés</span>
                        </NavLink>
                        <NavLink to="/dashboard/explorer" className={mobileNavLinkClass}>
                            <SearchIcon className="w-5 h-5" />
                            <span>Explorer</span>
                        </NavLink>
                        <NavLink to="/dashboard/quiz" className={mobileNavLinkClass}>
                            <FileQuestionMarkIcon className="w-5 h-5" />
                            <span>Quiz</span>
                        </NavLink>
                    </nav>
                </div>
            </div>

            {/* 2. CONTENU PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10 gap-4">
                    
                    {/* Barre de recherche */}
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">
                            <SearchIcon className="w-4 h-4" />
                        </span>
                        <input
                            type="text"
                            placeholder="Rechercher un cours..."
                            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Profil, Notifications et Bouton Hamburger à DROITE */}
                    <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
                        <Link to="/dashboard/profil" className="flex items-center space-x-2 sm:space-x-4">
                            <button type="button" className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
                                <BellIcon className="w-4 h-4" />
                            </button>
                            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
                                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-slate-800 text-xs shadow-inner">
                                    C
                                </div>
                                <span className="text-sm font-bold text-slate-900 hidden sm:inline">Camille</span>
                            </div>
                        </Link>

                        {/* Bouton Hamburger placé à droite */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0 cursor-pointer"
                            aria-label="Ouvrir le menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                {/* Contenu dynamique */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}