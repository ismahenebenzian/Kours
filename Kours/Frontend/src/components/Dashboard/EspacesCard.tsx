import type { Space } from "../Types"
import { Lock } from "lucide-react"
import { Users } from "lucide-react"


type EspacesCardProps =
{
    Espace:Space;
}
export default function EspacesCard({Espace }:EspacesCardProps)
{
    return (
         <div 
                            key={Espace.id}
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-indigo-200 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs shrink-0">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="font-extrabold text-slate-900 text-base">
                                            {Espace.title}
                                        </h2>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{Espace.membersCount} membres</span>
                                        </div>
                                    </div>
                                </div>

                                <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl border ${
                                    Espace.role === 'Admin' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                }`}>
                                    {Espace.role}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                                <span className="text-slate-400 font-medium">Activité récente</span>
                                <span className="font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                    {Espace.newCoursesCount} nouveaux cours
                                </span>
                            </div>
                        </div>
                    
)}