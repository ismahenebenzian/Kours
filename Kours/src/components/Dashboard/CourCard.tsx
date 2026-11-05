import { useState } from "react";
import type { Course } from "../Types";
import { Star } from "lucide-react";
export default function CoursCard ({ course }: { course: Course }) {
    const [modificationDisplay, setModificationDisplay] = useState(false);
    return (
         <div 
              key={course.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* En-tête de la carte : Illustration de document */}
                <div className="w-full h-36 bg-indigo-50/70 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="w-14 h-18 bg-white rounded-lg shadow-sm border border-indigo-100 flex flex-col items-center justify-center p-2 space-y-1.5">
                    <div className="w-6 h-1 bg-indigo-200 rounded-full" />
                    <div className="w-8 h-1 bg-indigo-200 rounded-full" />
                    <div className="w-5 h-1 bg-indigo-200 rounded-full" />
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
                    className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-sm transition-colors text-center"
                    onClick={ ()=> {setModificationDisplay(true); } }
                  >
                    Modifier
                  </button>
                  <button 
                    type="button"
                    className="py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-600 font-semibold text-xs rounded-xl border border-rose-100 shadow-sm transition-colors text-center"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div className={`absolute inset-0 bg-black/30 rounded-2xl w-full h-full z-20 ${modificationDisplay ? 'block' : 'hidden'}`}>overlay de modification
                  <div className="flex items-center justify-center h-full">
                    <button
                      type="button"
                      className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-sm transition-colors text-center"
                      onClick={ ()=> {setModificationDisplay(false); } }
                    >
                      Annuler
                    </button>
                  </div>
              </div>
            </div>
    )
}