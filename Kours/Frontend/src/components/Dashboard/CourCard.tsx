import { useState } from "react";
import type { Course } from "../Types";
import { Star, X, Save, Download, FileText, FileCode, FileArchive, ArrowDownToLine } from "lucide-react";

// Extension étendue du type Course pour inclure éventuellement les extensions et l'URL de téléchargement/aperçu
interface ExtendedCourse extends Course {
  previewImage?: string;
  extensions?: string[]; // ex: ['PDF', 'DOCX', 'ZIP']
  downloadUrl?: string;
}

export default function CoursCard({ course }: { course: ExtendedCourse }) {
  const [modificationDisplay, setModificationDisplay] = useState(false);
  
  // États locaux pour le formulaire d'édition en plein écran
  const [title, setTitle] = useState(course.title);
  const [type, setType] = useState(course.type);
  const [status, setStatus] = useState(course.status);
  const [domain, setDomain] = useState(course.domain);
  const [level, setLevel] = useState(course.level);
  const [university, setUniversity] = useState(course.university);
  const [year, setYear] = useState(course.year);
  
  // Extensions par défaut si non fournies (ex: PDF principal + Fichiers sources)
  const extensionsList = course.extensions || ['PDF', 'ZIP'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cours mis à jour :", { title, type, status, domain, level, university, year });
    setModificationDisplay(false);
  };

  // Fonction pour afficher l'icône selon l'extension
  const getExtensionIcon = (ext: string) => {
    switch (ext.toUpperCase()) {
      case 'PDF': return <FileText className="w-4 h-4 text-rose-500" />;
      case 'ZIP': case 'RAR': return <FileArchive className="w-4 h-4 text-amber-500" />;
      default: return <FileCode className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <>
      {/* CARTE NORMALE DANS LA GRILLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
        <div className="space-y-4">
          
          {/* APERÇU DU DOCUMENT (Image ou miniature stylisée) */}
          <div className="w-full h-36 bg-indigo-50/70 rounded-2xl flex items-center justify-center relative overflow-hidden group border border-indigo-100/50">
            {course.previewImage ? (
              <img 
                src={course.previewImage} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-14 h-18 bg-white rounded-xl shadow-md border border-indigo-100 flex flex-col items-center justify-center p-2 space-y-1.5 group-hover:scale-105 transition-transform duration-300">
                <FileText className="w-6 h-6 text-indigo-600" />
                <div className="w-6 h-1 bg-indigo-100 rounded-full" />
                <div className="w-4 h-1 bg-indigo-100 rounded-full" />
              </div>
            )}

            {/* Badge des extensions disponibles sur l'aperçu */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg shadow-xs border border-slate-100">
              {extensionsList.map((ext, idx) => (
                <span key={idx} className="text-[10px] font-bold text-slate-700 uppercase px-1.5 py-0.5 bg-slate-100 rounded">
                  {ext}
                </span>
              ))}
            </div>
          </div>

          {/* Badges : Type & Statut */}
          <div className="flex items-center justify-between gap-2">
            <span className="bg-indigo-50 text-indigo-700 font-semibold text-xs px-3 py-1 rounded-full">
              {course.type}
            </span>
            <span className={`font-semibold text-xs px-3 py-1 rounded-full ${
              course.status === 'Publié' 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-amber-50 text-amber-600'
            }`}>
              {course.status}
            </span>
          </div>

          {/* Titre du cours */}
          <h3 className="font-bold text-slate-900 text-lg leading-snug">
            {course.title}
          </h3>

          {/* Métadonnées du cours */}
          <p className="text-xs text-slate-500 leading-relaxed">
            {course.domain} · {course.level} · {course.university}<br />
            {course.author} · {course.year}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          {/* Statistiques du cours */}
          <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
              <span className="text-slate-400 ml-1">{course.likes !== 0 && `· ${course.likes} j'aime`}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span>{course.comments} commentaires</span>
            </div>
          </div>

          {/* Boutons d'action : Modifier / Supprimer */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-sm transition-colors text-center cursor-pointer"
              onClick={() => setModificationDisplay(true)}
            >
              Modifier
            </button>
            <button 
              type="button"
              className="py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-600 font-semibold text-xs rounded-xl border border-rose-100 shadow-sm transition-colors text-center cursor-pointer"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAY PLEIN ÉCRAN POUR LES DÉTAILS, L'APERÇU ET LA MODIFICATION */}
      {modificationDisplay && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-10 my-auto space-y-8">
            
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <button
                type="button"
                onClick={() => setModificationDisplay(false)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Retour
              </button>
              <h2 className="text-lg font-extrabold text-slate-900">Aperçu et modification du cours</h2>
              <button 
                type="button"
                onClick={() => setModificationDisplay(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SECTION APERÇU AGRANDI & LIENS DE TÉLÉCHARGEMENT MULTI-EXTENSIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200/60 items-center">
              
              {/* Miniature grand format */}
              <div className="h-40 bg-indigo-100/60 rounded-2xl flex flex-col items-center justify-center border border-indigo-200/60 relative overflow-hidden">
                <FileText className="w-12 h-12 text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-indigo-900">Aperçu du document</span>
              </div>

              {/* Infos & Liens de téléchargement par extension */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fichiers téléchargeables</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ce cours est disponible en plusieurs formats :</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {extensionsList.map((ext, idx) => (
                    <a
                      key={idx}
                      href={course.downloadUrl || "#"}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 shadow-xs transition-all cursor-pointer"
                    >
                      {getExtensionIcon(ext)}
                      <span>Télécharger .{ext.toLowerCase()}</span>
                      <ArrowDownToLine className="w-3.5 h-3.5 ml-1 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire complet de modification */}
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Titre du cours</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Type de document</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                  >
                    <option value="Cours complet">Cours complet</option>
                    <option value="Fiche révision">Fiche révision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Statut</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                  >
                    <option value="Publié">Publié</option>
                    <option value="Privé">Privé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Domaine</label>
                  <input 
                    type="text" 
                    value={domain} 
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Niveau</label>
                  <input 
                    type="text" 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                  />
                </div>

              </div>

              {/* Boutons d'action */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModificationDisplay(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer les modifications
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}