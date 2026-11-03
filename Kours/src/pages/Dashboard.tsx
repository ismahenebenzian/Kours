import { BellIcon, BookIcon, HomeIcon, LockIcon, SearchIcon, SparklesIcon, Target, Upload } from "lucide-react";
import Logo from "../components/Logo";
import BureauImage from "../assets/dashboard/bureauImage.png";
import SqlImage from "../assets/dashboard/SqlImage.svg";
import background from "../assets/Dashboard/background.svg";
export default function Dashboard() {
    return (
        <div className="min-h-screen w-full bg-slate-50 flex">

            {/* 1. SIDEBAR GAUCHE */}
            <aside className="w-70 bg-slate-900 text-slate-300 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
                <div className="space-y-6">
                    <Logo />

                    {/* Menu de navigation */}
                    <nav className="space-y-1.5">
                        <a href="#accueil" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm">
                            <HomeIcon className="w-4 h-4" />
                            <span>Accueil</span>
                        </a>
                        <a href="#mes-cours" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            <BookIcon className="w-4 h-4" />
                            <span>Mes cours</span>
                        </a>
                        <a href="#espaces" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            <LockIcon className="w-4 h-4" />
                            <span>Espaces privés</span>
                        </a>
                        <a href="#explorer" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            <SearchIcon className="w-4 h-4" />
                            <span>Explorer</span>
                        </a>
                    </nav>
                </div>

                {/* Encadré d'appel à l'action bas de sidebar */}
                <div
                    className="relative    bg-red-500 p-5 text-white bg-cover bg-center rounded-xl flex flex-col justify-between"
                    style={{ backgroundImage: `url(${background})`, backgroundSize: 'zoom', backgroundPosition: 'center' }}
                >
                    
                    {/* Contenu de la carte */}
                    <div className="relative z-10">
                        <h4 className="font-bold text-sm mb-1">Ensemble<br />on va plus loin !</h4>
                        <p className="text-[11px] text-indigo-100 mb-5 leading-relaxed">
                            Partage tes cours et aide d'autres étudiants
                        </p>
                    </div>

                    <div className="relative z-10">
                        <button className="w-full bg-indigo-600/90 hover:bg-indigo-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center space-x-2">
                            <span>Partager un cours</span>
                            <span>→</span>
                        </button>
                    </div>
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
                    <div className="flex items-center space-x-4">
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

                {/* Corps de la page */}
                <div className="p-6 sm:p-8 space-y-6">

                    {/* Bannière d'accueil */}
                    <div className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-center" style={{ backgroundImage: `url(${BureauImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="max-w-xl z-10 mb-6 md:mb-0">
                            <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                                Bonjour camille <SparklesIcon className="w-5 h-5 text-amber-400" />
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 mt-2">
                                Retrouve tes cours et poursuis tes révisions.
                            </p>
                            <button className="mt-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2">
                                <SearchIcon className="w-4 h-4" /> Explorer les cours
                            </button>
                        </div>
                    </div>

                    {/* 3 Cartes de Statistiques / Compteurs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Carte 1 */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                <Upload className="w-4 h-4" />
                            </div>
                            <div>
                                <p className={`text-[11px] font-semibold text-slate-400 uppercase tracking-wider`}>Mes cours déposés</p>
                                <div className="flex items-baseline space-x-2 mt-0.5">
                                    <span className="text-2xl font-bold text-slate-900">8</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">dont 1 en attente de validation</p>
                            </div>
                        </div>

                        {/* Carte 2 */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                                ★
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Cours enregistrés</p>
                                <div className="flex items-baseline space-x-2 mt-0.5">
                                    <span className="text-2xl font-bold text-slate-900">24</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">dans 4 matières</p>
                            </div>
                        </div>

                        {/* Carte 3 */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                                <Target className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Quiz terminés</p>
                                <div className="flex items-baseline space-x-2 mt-0.5">
                                    <span className="text-2xl font-bold text-slate-900">14</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">78 % de bonnes réponses</p>
                            </div>
                        </div>
                    </div>

                    {/* Section centrale : Reprendre la lecture & Activité récente */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Reprendre la lecture (2 colonnes) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Reprendre la lecture</h3>
                                <a href="#tous" className="text-xs font-semibold text-indigo-600 hover:underline">
                                    Voir tous mes cours →
                                </a>
                            </div>

                            <div className="space-y-4">
                                {/* Item 1 */}
                                <div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all bg-slate-50/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-900">Normalisation des bases de données</span>
                                        <span className="text-[11px] text-slate-400 font-medium">p. 14 / 52</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full rounded-full w-1/3"></div>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all bg-slate-50/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-900">Réseaux : modèle OSI et TCP/IP</span>
                                        <span className="text-[11px] text-slate-400 font-medium">p. 23 / 36</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full rounded-full w-2/3"></div>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all bg-slate-50/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-900">Algorithmique : complexité et tris</span>
                                        <span className="text-[11px] text-slate-400 font-medium">p. 27 / 30</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full rounded-full w-4/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activité récente (1 colonne) */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Activité récente</h3>
                                    <a href="#tout" className="text-xs font-semibold text-indigo-600 hover:underline">
                                        Voir tout →
                                    </a>
                                </div>

                                <div className="space-y-4 text-xs">
                                    <div className="pb-3 border-b border-slate-100">
                                        <p className="text-slate-800 font-medium">Léa a commenté ton cours « Normalisation des bases de données »</p>
                                        <span className="text-slate-400 text-[10px]">Il y a 2h</span>
                                    </div>
                                    <div className="pb-3 border-b border-slate-100">
                                        <p className="text-slate-800 font-medium">Ton cours « Réseaux : modèle OSI » a reçu 12 j'aime</p>
                                        <span className="text-slate-400 text-[10px]">Hier</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-800 font-medium">Quiz terminé : 4 bonnes réponses sur 5</p>
                                        <span className="text-slate-400 text-[10px]">Il y a 2 jours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Section Suggestions pour toi */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                                    <span>✨</span> Suggestions pour toi
                                </h3>
                                <p className="text-xs text-slate-400">D'après ton domaine et les cours que tu consultes</p>
                            </div>
                            <a href="#suggestions" className="text-xs font-semibold text-indigo-600 hover:underline">
                                Voir toute les suggestions →
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Suggestion 1 */}
                            <div className="flex justify-center gap-4">

                                <div className="p-4 rounded-2xl  flex justify-center gap-4 border border-slate-100 bg-slate-50/50 hover:shadow-sm transition-all">
                                    <img src={SqlImage} alt="" />
                                    <div>
                                        <span className="text-xs font-bold text-slate-900 block truncate">SQL avancé : jointures et sous-requêtes</span>
                                        <span className="text-[10px] text-slate-500 block mt-0.5">Informatique • BUT 2 • Université de Lille</span>
                                        <div className="flex items-center justify-between mt-3 text-xs">
                                            <span className="text-amber-500 font-bold">★ 4,6 <span className="text-slate-400 font-normal">(102 avis)</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Suggestion 2 */}
                            <div className="flex justify-center gap-4">

                                <div className="p-4 rounded-2xl  flex justify-center gap-4 border border-slate-100 bg-slate-50/50 hover:shadow-sm transition-all">
                                    <img src={SqlImage} alt="" />
                                    <div></div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-900 block truncate">Modélisation UML : diagrammes de classes</span>
                                        <span className="text-[10px] text-slate-500 block mt-0.5">Informatique • BUT 2 • Université de Lille</span>
                                        <div className="flex items-center justify-between mt-3 text-xs">
                                            <span className="text-amber-500 font-bold">★ 3,8 <span className="text-slate-400 font-normal">(70 avis)</span></span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Suggestion 1 */}
                            <div className="flex justify-center gap-4">

                                <div className="p-4 rounded-2xl  flex justify-center gap-4 border border-slate-100 bg-slate-50/50 hover:shadow-sm transition-all">
                                    <img src={SqlImage} alt="" />
                                    <div>
                                        <span className="text-xs font-bold text-slate-900 block truncate">SQL avancé : jointures et sous-requêtes</span>
                                        <span className="text-[10px] text-slate-500 block mt-0.5">Informatique • BUT 2 • Université de Lille</span>
                                        <div className="flex items-center justify-between mt-3 text-xs">
                                            <span className="text-amber-500 font-bold">★ 4,6 <span className="text-slate-400 font-normal">(102 avis)</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}