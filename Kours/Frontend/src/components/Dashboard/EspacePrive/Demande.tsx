import type { JoinRequest } from "../Types"

type DemandeProps ={
    D:JoinRequest;
    handleRefuse:any;
    handlaAccepte:any;
}

export default function Demande ({D,handlaAccepte,handleRefuse}:DemandeProps)
{
    return(
        
         <div 
                                    key={D.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0">
                                            {D.userName.charAt(0)}
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-extrabold text-slate-900">{D.userName}</span>{' '}
                                            <span className="text-slate-500">veut rejoindre « {D.spaceName} »</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleRefuse(D.id)}
                                            className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-red-100 transition-all cursor-pointer shadow-xs"
                                        >
                                            Refuser
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlaAccepte(D.id)}
                                            className="flex-1 sm:flex-none px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                                        >
                                            Accepter
                                        </button>
                                    </div>
                                </div>
    )
}