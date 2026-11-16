import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Minus,Plus } from "lucide-react";
export default function GenenerAvecIA ()
{
        const [aiCount, setAiCount] = useState<number>(10);
    
    return (

        <div className="bg-[#f3f5fd] rounded-3xl p-6 border border-indigo-100/60 shadow-xs space-y-4">
                            <div className="w-10 h-10 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                                <Sparkles className="w-5 h-5" />
                            </div>

                            <div>
                                <h2 className="font-extrabold text-slate-900 text-base">
                                    Générer avec l'IA
                                </h2>
                                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                                    Les questions sont créées à partir du texte du cours, avec la page source de chaque réponse.
                                </p>
                            </div>

                            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-indigo-100 shadow-xs">
                                <span className="text-xs font-bold text-slate-700">Nombre de questions</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setAiCount(Math.max(1, aiCount - 1))}
                                        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-xs font-extrabold text-slate-900 w-5 text-center">{aiCount}</span>
                                    <button
                                        type="button"
                                        onClick={() => setAiCount(aiCount + 1)}
                                        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer"
                            >
                                Générer {aiCount} questions
                            </button>
                        </div>

    )
}