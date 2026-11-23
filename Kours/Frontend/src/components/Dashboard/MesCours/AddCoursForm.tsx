import { useState } from "react";
import { ArrowLeft, Upload, FileText, X } from "lucide-react";

export default function AddCoursForm({ setAddcoursDisplay }: { setAddcoursDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    // États locaux pour le formulaire (facultatifs, pour la structure)
    const [title, setTitle] = useState("Normalisation des bases de données");
    const [domain, setDomain] = useState("Informatique · Bases de données");
    const [level, setLevel] = useState("BUT 2");
    const [university, setUniversity] = useState("Université de Lyon");
    const [docType, setDocType] = useState("Cours complet");
    const [author, setAuthor] = useState("M. Garnier");
    const [year, setYear] = useState("2025-2026");
    const [visibility, setVisibility] = useState<"public" | "private">("public");
    const [engagement, setEngagement] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Cours publié !");
        setAddcoursDisplay(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-200">
            <div className="max-w-4xl mx-auto w-full bg-slate-50 rounded-3xl shadow-2xl p-6 sm:p-10 my-auto space-y-6 relative">
                
                {/* Petit bouton retour en haut */}
                <button
                    type="button"
                    onClick={() => setAddcoursDisplay(false)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                </button>

                {/* BANNIÈRE SUPÉRIEURE : Partage un peu... */}
                <div className="bg-indigo-950 text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                            🎁 Partage un peu, débloque beaucoup !
                        </h2>
                        <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                            Dépose 1 à 2 cours pour débloquer les lectures illimitées.<br />
                            Récolte des likes, cumule des points et profite de récompenses supplémentaires.<br />
                            <span className="italic text-indigo-300">Un petit partage pour toi, un grand coup de pouce pour tous !</span>
                        </p>
                    </div>

                    {/* Progression */}
                    <div className="bg-indigo-900/80 border border-indigo-800/60 p-4 rounded-2xl w-full md:w-72 shrink-0 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-white">
                            <span>Ta progression</span>
                            <span className="text-amber-400">1 sur 2</span>
                        </div>
                        <div className="w-full bg-indigo-950 rounded-full h-2 overflow-hidden">
                            <div className="bg-amber-400 h-full w-1/2 rounded-full" />
                        </div>
                        <p className="text-[10px] text-indigo-300">Encore un cours pour tout débloquer</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* ÉTAPE 1 : Ton fichier */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/60 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                            <h3 className="font-bold text-slate-900 text-sm">Ton fichier</h3>
                        </div>

                        {/* Zone de drag & drop */}
                        <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/20 rounded-2xl p-8 text-center space-y-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                                <Upload className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-800">Glisse ton PDF ici</p>
                                <p className="text-[11px] text-slate-400">ou</p>
                            </div>
                            <button
                                type="button"
                                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                Parcourir mes fichiers
                            </button>
                            <p className="text-[10px] text-slate-400">Format PDF uniquement</p>
                        </div>

                        {/* Fichier importé simulant la maquette */}
                        <div className="flex items-center justify-between p-3 bg-emerald-50/40 border border-emerald-100 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-800">normalisation-bdd.pdf</p>
                                    <p className="text-[10px] text-slate-400">2.4 Mo · 52 pages</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-emerald-600">Importé</span>
                                <button type="button" className="text-slate-400 hover:text-slate-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        {/* Barre de progression verte du fichier */}
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                            <div className="bg-emerald-500 h-full w-full rounded-full" />
                        </div>
                    </div>

                    {/* ÉTAPE 2 : Informations sur le cours */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/60 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                            <h3 className="font-bold text-slate-900 text-sm">Informations sur le cours</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Titre</label>
                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Domaine / matière</label>
                                <input 
                                    type="text" 
                                    value={domain} 
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Niveau</label>
                                <input 
                                    type="text" 
                                    value={level} 
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Établissement</label>
                                <input 
                                    type="text" 
                                    value={university} 
                                    onChange={(e) => setUniversity(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Type de document</label>
                                <input 
                                    type="text" 
                                    value={docType} 
                                    onChange={(e) => setDocType(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Auteur ou enseignant</label>
                                <input 
                                    type="text" 
                                    value={author} 
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">Obligatoire pour respecter les droits d'auteur</p>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Année universitaire</label>
                                <input 
                                    type="text" 
                                    value={year} 
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">Obligatoire</p>
                            </div>
                        </div>
                    </div>

                    {/* ÉTAPE 3 : Visibilité et engagement */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/60 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                            <h3 className="font-bold text-slate-900 text-sm">Visibilité et engagement</h3>
                        </div>

                        {/* Options de visibilité */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div 
                                onClick={() => setVisibility("public")}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    visibility === "public" ? "border-indigo-600 bg-indigo-50/20" : "border-slate-200 bg-white"
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <input type="radio" checked={visibility === "public"} readOnly className="text-indigo-600" />
                                    <span className="text-xs font-bold text-slate-900">Public</span>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-5">Visible par tous les étudiants de Rezoer.</p>
                            </div>

                            <div 
                                onClick={() => setVisibility("private")}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    visibility === "private" ? "border-indigo-600 bg-indigo-50/20" : "border-slate-200 bg-white"
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <input type="radio" checked={visibility === "private"} readOnly className="text-indigo-600" />
                                    <span className="text-xs font-bold text-slate-900">Privé</span>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-5">Réservé à un groupe clos, accès sur demande.</p>
                            </div>
                        </div>

                        {/* Remarque */}
                        <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
                            <span className="font-bold">Remarque :</span> Ton cours peut être vérifié par l'équipe avant sa mise en ligne. Un document signalé peut être retiré rapidement.
                        </div>

                        {/* Checkbox d'engagement */}
                        <label className="flex items-start gap-3 p-4 bg-amber-50/30 border border-amber-100 rounded-2xl cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={engagement} 
                                onChange={(e) => setEngagement(e.target.checked)}
                                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" 
                            />
                            <span className="text-[11px] text-slate-700 leading-relaxed">
                                <strong className="text-slate-900">Engagement sur l'honneur.</strong> Je certifie être l'auteur de ce document, avoir l'accord de son auteur ou qu'il est sous licence libre. Je respecte le droit d'auteur.
                            </span>
                        </label>

                        {/* Bouton de soumission final */}
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer"
                        >
                            Publier le cours
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}