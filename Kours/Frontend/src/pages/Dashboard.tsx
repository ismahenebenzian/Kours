import { BellIcon, BookIcon, FileQuestionMarkIcon, HomeIcon, LockIcon, NotepadTextDashedIcon, SearchIcon } from "lucide-react";
import { NavLink, Outlet, Link } from "react-router-dom";
import Logo from "../components/Logo";
import background from "../assets/Dashboard/background.svg";
import { ShareCourseButton } from "../components/Dashboard/CTA-btn";

export default function Dashboard() {
    // Fonction utilitaire pour le style des liens actifs/inactifs
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm shadow-sm w-full transition-colors ${
            isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"
        }`;

    return (
        <div className="min-h-screen w-full bg-slate-50 flex">
            {/* 1. SIDEBAR GAUCHE */}
            <aside className="w-70 bg-slate-900 text-slate-300 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
                <div className="space-y-6">
                    <Logo />
                    <nav className="space-y-1.5">
                        {/* 'end' évite que Accueil reste allumé quand on est sur /dashboard/mes-cours */}
                        <NavLink to="/dashboard" end className={navLinkClass}>
                            <HomeIcon className="w-4 h-4" />
                            <span>Accueil</span>
                        </NavLink>
                        <NavLink to="/dashboard/mes-cours" className={navLinkClass}>
                            <BookIcon className="w-4 h-4" />
                            <span>Mes cours</span>
                        </NavLink>
                        <NavLink to="/dashboard/notes" className={navLinkClass}>
                            <NotepadTextDashedIcon className="w-4 h-4" />
                            <span>Notes</span>
                        </NavLink>
                        <NavLink to="/dashboard/espaces-prives" className={navLinkClass}>
                            <LockIcon className="w-4 h-4" />
                            <span>Espaces privés</span>
                        </NavLink>
                        <NavLink to="/dashboard/explorer" className={navLinkClass}>
                            <SearchIcon className="w-4 h-4" />
                            <span>Explorer</span>
                        </NavLink>
                        <NavLink to="/dashboard/quiz" className={navLinkClass}>
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

            {/* 2. CONTENU PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">
                            <SearchIcon className="w-4 h-4" />
                        </span>
                        <input
                            type="text"
                            placeholder="Rechercher un cours, une matière..."
                            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                    <Link to="/dashboard/profil" className="flex items-center space-x-4">
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
                </header>

                {/* Ici s'affichera dynamiquement la page active (DashHome, MesCours, CourseDetail, etc.) */}
                <div className="p-6 sm:p-8 space-y-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}