import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
    Star, 
    Download, 
    Bookmark, 
    Share2, 
    Info, 
    ChevronRight, 
    Sparkles, 
    Send, 
    ThumbsUp,
    Flag,
    AlertTriangle,
    X
} from "lucide-react";
import type { Course } from "../components/Types";
import MockImage from "../assets/Dashboard/jk 1.png";
import PopUp from "../components/PopUp"; // Ajuste le chemin si nécessaire

// Simulation d'une liste de cours (dans un cas réel, tu récupérerais ça via une API ou un state global)
const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Normalisation des bases de données',
        type: 'Cours complet',
        status: 'Publié',
        domain: 'Informatique',
        level: 'BUT 2',
        university: 'Université de Lyon',
        author: 'M. Garnier (enseignant)',
        year: '2025–2026',
        rating: 4.7,
        likes: 183,
        comments: 1,
        previewImage: '', 
        extensions: ['PDF', 'ZIP'],
        downloadUrl: '#'
    },
    {
        id: '2',
        title: 'Modèle relationnel et algèbre relationnelle',
        type: 'Cours complet',
        status: 'Privé',
        domain: 'Informatique',
        level: 'BUT 2',
        university: 'Université de Lyon',
        author: 'M. Garnier (enseignant)',
        year: '2025–2026',
        rating: '—',
        likes: 0,
        comments: 0,
    },
    {
        id: '3',
        title: 'SQL : jointures et sous-requêtes',
        type: 'Fiche révision',
        status: 'Privé',
        domain: 'Informatique',
        level: 'BUT 2',
        university: 'Université de Lille',
        author: 'M. Garnier (enseignant)',
        year: '2025–2026',
        rating: 4.8,
        likes: 182,
        comments: 24,
    }
];

export default function CourseDetail() {
    const { id } = useParams();

    // États pour la pop-up de signalement
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState("");

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Cours signalé pour motif :", reportReason);
        setIsReportOpen(false);
        setReportReason("");
    };

    // Recherche du cours correspondant à l'ID de l'URL
    const course = mockCourses.find((c) => c.id === id);

    if (!course) {
        return (
            <div className="p-8 text-center space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Cours introuvable</h2>
                <Link to="/dashboard/explorer" className="text-indigo-600 hover:underline text-sm font-semibold">
                    ← Retour à l'exploration
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 relative">
            
            {/* 1. FIL D'ARIANE */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
                <Link to="/dashboard/explorer" className="hover:text-indigo-600 transition-colors">Rechercher</Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.domain}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-medium">{course.title}</span>
            </div>

            {/* Layout principal en 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* COLONNE GAUCHE (Contenu principal & Aperçu) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Badge type de cours et Bouton de signalement */}
                    <div className="flex items-center justify-between">
                        <span className="inline-block bg-indigo-50 text-indigo-700 font-semibold text-xs px-3 py-1 rounded-full">
                            {course.type}
                        </span>

                        <button 
                            onClick={() => setIsReportOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                            title="Signaler ce cours"
                        >
                            <Flag className="w-3.5 h-3.5" />
                            <span>Signaler</span>
                        </button>
                    </div>

                    {/* Titre du cours */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {course.title}
                    </h1>

                    {/* Métadonnées (Auteur, Année, Établissement, Niveau, Note) */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 border-b border-slate-200/60 pb-6">
                        <div>
                            <span className="text-slate-400">Auteur : </span>
                            <span className="font-semibold text-slate-700">{course.author}</span>
                        </div>
                        <div>
                            <span className="text-slate-400">Année : </span>
                            <span className="font-semibold text-slate-700">{course.year}</span>
                        </div>
                        <div>
                            <span className="text-slate-400">Établissement : </span>
                            <span className="font-semibold text-slate-700">{course.university}</span>
                        </div>
                        <div>
                            <span className="text-slate-400">Niveau : </span>
                            <span className="font-semibold text-slate-700">{course.level}</span>
                        </div>
                        {typeof course.rating === 'number' && (
                            <div className="flex items-center gap-1 font-semibold text-slate-700">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{course.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Barre d'actions (Télécharger, Likes, Ajouter, Partager) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                        <a 
                            href={course.downloadUrl || "#"} 
                            download 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                            <Download className="w-4 h-4" />
                            <span>Télécharger</span>
                        </a>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                                <span>{course.likes}</span>
                            </div>
                            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer">
                                <Bookmark className="w-4 h-4 text-slate-500" />
                                <span>Ajouter</span>
                            </button>
                            <button className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer">
                                <Share2 className="w-4 h-4 text-slate-500" />
                            </button>
                            <button className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer">
                                <Info className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>
                    </div>

                    {/* Cadre d'aperçu du document (Image / Schéma) */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-center min-h-[450px]">
                        {course.previewImage ? (
                            <img 
                                src={course.previewImage} 
                                alt={course.title} 
                                className="max-h-[500px] w-auto object-contain rounded-xl border border-slate-100"
                            />
                        ) : (
                            <img 
                                src={MockImage} 
                                alt={course.title} 
                                className="max-h-[500px] w-auto object-contain rounded-xl border border-slate-100"
                            />
                        )}
                    </div>
                </div>

                {/* COLONNE DROITE (Quiz, Notation, Commentaires) */}
                <div className="space-y-6">
                    
                    {/* Bloc Quiz interactif */}
                    <div className="bg-[#17245E] text-white p-6 rounded-3xl shadow-md space-y-4 relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> Quiz
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold">Teste-toi sur ce cours</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Un quiz personnalisé à partir du contenu du cours.
                            </p>
                        </div>

                        <button className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-2xl shadow-sm transition-colors cursor-pointer">
                            Lancer le quiz
                        </button>
                    </div>

                    {/* Bloc Donnez votre avis (Étoiles) */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                        <h4 className="font-bold text-slate-900 text-sm">Donne ton avis</h4>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} className="text-slate-300 hover:text-amber-400 transition-colors cursor-pointer">
                                    <Star className="w-6 h-6" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bloc Commentaires */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                        <h4 className="font-bold text-slate-900 text-sm">Commentaires ({course.comments})</h4>

                        {/* Input pour écrire un commentaire */}
                        <div className="space-y-3">
                            <textarea 
                                rows={3}
                                placeholder="Ajouter un commentaire ou poser une question..."
                                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 text-slate-900 resize-none"
                            />
                            <div className="flex justify-end">
                                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer">
                                    <span>Publier</span>
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Liste des commentaires (Exemple statique basé sur la maquette) */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            {course.comments > 0 ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                                                L
                                            </div>
                                            <div>
                                                <h6 className="font-bold text-xs text-slate-900">Léa M.</h6>
                                                <span className="text-[10px] text-slate-400">il y a 2h</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed pl-9">
                                        Quelqu'un aurait la correction de l'exercice 3 ?
                                    </p>
                                    <div className="pl-9 flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                                        <button className="hover:text-indigo-600 transition-colors cursor-pointer">6 j'aime</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 text-center py-4">Aucun commentaire pour le moment.</p>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            {/* POP-UP DE SIGNALEMENT */}
            <PopUp IsOpen={isReportOpen}>
                <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base">Signaler un problème</h3>
                                <p className="text-xs text-slate-500">Aidez-nous à modérer ce contenu.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsReportOpen(false)}
                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <form onSubmit={handleReportSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Motif du signalement</label>
                            <select 
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50"
                                required
                            >
                                <option value="">Sélectionnez un motif</option>
                                <option value="Contenu inapproprié">Contenu inapproprié</option>
                                <option value="Violation de droits d'auteur">Violation de droits d'auteur</option>
                                <option value="Informations erronées">Informations erronées</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsReportOpen(false)}
                                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                            >
                                Envoyer le signalement
                            </button>
                        </div>
                    </form>
                </div>
            </PopUp>

        </div>
    );
}