import { BellIcon, BookIcon, HomeIcon, LockIcon, NotepadTextDashedIcon, SearchIcon } from "lucide-react";
import Logo from "../components/Logo";
import background from "../assets/Dashboard/background.svg";
import { ShareCourseButton } from "../components/Dashboard/CTA-btn";
import DashHome from "../components/Dashboard/Dash-home";
import Profile from "../components/Dashboard/Profile";
import { useState } from "react";
import MesCours from "../components/Dashboard/MesCours";
import Notes from "../components/Dashboard/Note";


const DashNav = ["Accueil", "Mes cours", "Espaces privés", "Explorer", "Profil"];

export default function Dashboard() {

    const [activeNav, setActiveNav] = useState(DashNav[0]);

    return (
        <div className="min-h-screen w-full bg-slate-50 flex">

            {/* 1. SIDEBAR GAUCHE */}
            <aside className="w-70 bg-slate-900 text-slate-300 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
                <div className="space-y-6">
                    <Logo />

                    {/* Menu de navigation */}
                    <nav className="space-y-1.5">
                        <button onClick={() => setActiveNav("Accueil")} className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${activeNav === "Accueil" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"} font-medium text-sm shadow-sm w-full`}>
                            <HomeIcon className="w-4 h-4" />
                            <span>Accueil</span>
                        </button>
                        <button onClick={() => setActiveNav("Mes cours")} className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${activeNav === "Mes cours" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"} font-medium text-sm shadow-sm w-full`}>
                            <BookIcon className="w-4 h-4" />
                            <span>Mes cours</span>
                        </button>
                        <button onClick={() => setActiveNav("Notes")} className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${activeNav === "Notes" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"} font-medium text-sm shadow-sm w-full`}>
                            <NotepadTextDashedIcon className="w-4 h-4" />
                            <span>Notes</span>
                        </button>
                        <button onClick={() => setActiveNav("Espaces privés")} className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${activeNav === "Espaces privés" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"} font-medium text-sm shadow-sm w-full`}>
                            <LockIcon className="w-4 h-4" />
                            <span>Espaces privés</span>
                        </button>
                        <button onClick={() => setActiveNav("Explorer")} className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${activeNav === "Explorer" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"} font-medium text-sm shadow-sm w-full`}>
                            <SearchIcon className="w-4 h-4" />
                            <span>Explorer</span>
                        </button>
                        
                    </nav>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <span><img src={background} alt="" /></span>
                    <span><ShareCourseButton />   </span>
                </div>
            </aside>

            {/* 2. CONTENU PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

                {/* Barre de navigation supérieure (TopBar) */}
                <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    {/* Barre de recherche */}
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm"><SearchIcon className="w-4 h-4" /></span>
                        <input
                            type="text"
                            placeholder="Rechercher un cours, une matière..."
                            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    {/* Profil et notifications */}
                    <div className="flex items-center space-x-4" onClick={() => setActiveNav("Profil")}>
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
                            <BellIcon className="w-4 h-4" />
                        </button>
                        <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-slate-800 text-xs shadow-inner">
                                C
                            </div>
                            <span className="text-sm font-bold text-slate-900 hidden sm:inline">Camille</span>
                        </div>
                    </div>
                </header>
                { activeNav === "Accueil" && <DashHome />}
                { activeNav === "Mes cours" && <div className="p-6 sm:p-8 space-y-6"><MesCours /></div>}
                { activeNav === "Espaces privés" && <div className="p-6 sm:p-8 space-y-6">Espaces privés</div>}
                { activeNav === "Explorer" && <div className="p-6 sm:p-8 space-y-6">Explorer</div>}
                { activeNav === "Profil" && <div className="p-6 sm:p-8 space-y-6"><Profile /></div>}
                { activeNav === "Notes" && <div className="p-6 sm:p-8 space-y-6"><Notes /></div>}
            </main>
        </div>
    );
}