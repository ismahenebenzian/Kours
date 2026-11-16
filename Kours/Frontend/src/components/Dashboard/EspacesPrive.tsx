import { useState } from 'react';
import {  Plus, X } from 'lucide-react';
import PopUp from '../PopUp';
import type {Space,JoinRequest} from '../Types';
import EspacesCard from './EspacesCard';
import Demande from './Demande';






export default function EspacesPrives() {
    const [spaces, setSpaces] = useState<Space[]>([
        {
            id: '1',
            title: "Groupe BUT2 Info",
            membersCount: 8,
            role: 'Admin',
            newCoursesCount: 3,
        },
        {
            id: '2',
            title: "Révisions partiels",
            membersCount: 5,
            role: 'Membre',
            newCoursesCount: 1,
        },
        
    ]);

    const [requests, setRequests] = useState<JoinRequest[]>([
        {
            id: 'req-1',
            userName: "Ines",
            spaceName: "Groupe BUT2 Info"
        }
    ]);

    // États pour gérer l'affichage et les valeurs des popups
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isJoinOpen, setIsJoinOpen] = useState(false);
    const [newSpaceTitle, setNewSpaceTitle] = useState("");
    const [joinSpaceTitle, setJoinSpaceTitle] = useState("");

    const handleAcceptRequest = (id: string) => {
        setRequests(requests.filter(req => req.id !== id));
    };

    const handleRefuseRequest = (id: string) => {
        setRequests(requests.filter(req => req.id !== id));
    };

    // Soumission de la création d'un espace via la popup
    const submitCreateSpace = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSpaceTitle.trim()) return;

        const newSpace: Space = {
            id: String(Date.now()),
            title: newSpaceTitle.trim(),
            membersCount: 1,
            role: 'Admin',
            newCoursesCount: 0
        };
        setSpaces([...spaces, newSpace]);
        setNewSpaceTitle("");
        setIsCreateOpen(false);
    };

    // Soumission de la demande pour rejoindre un espace via la popup
    const submitJoinSpace = (e: React.FormEvent) => {
        e.preventDefault();
        if (!joinSpaceTitle.trim()) return;

        alert(`Demande d'adhésion envoyée pour l'espace : ${joinSpaceTitle.trim()}`);
        setJoinSpaceTitle("");
        setIsJoinOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50/60 p-6 sm:p-10 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* EN-TÊTE & BOUTONS D'ACTION */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                            Espaces privés
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Partage des cours avec ton groupe de travail.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsJoinOpen(true)}
                            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer"
                        >
                            Rejoindre un espace
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xs transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4 stroke-[3]" />
                            Créer un espace
                        </button>
                    </div>
                </div>

                {/* LISTE DES ESPACES PRIVÉS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {spaces.map((space) => (
                        <EspacesCard Espace={space}></EspacesCard>
                    ))}
                </div>

                {/* SECTION DEMANDES D'ACCÈS (SI PRÉSENTES) */}
                {requests.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                        <h2 className="font-extrabold text-slate-900 text-base">
                            Demandes d'accès ({requests.length})
                        </h2>

                        <div className="space-y-4">
                            {requests.map((req) => (
                               <Demande D={req} handlaAccepte={handleAcceptRequest} handleRefuse={handleRefuseRequest}/>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* POPUP : CRÉER UN ESPACE */}
            <PopUp IsOpen={isCreateOpen}>
                <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-extrabold text-slate-900">Créer un espace privé</h3>
                        <button 
                            type="button" 
                            onClick={() => setIsCreateOpen(false)}
                            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={submitCreateSpace} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-700">Nom de l'espace</label>
                            <input 
                                type="text"
                                placeholder="Ex: Groupe TD Info"
                                value={newSpaceTitle}
                                onChange={(e) => setNewSpaceTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/30"
                                autoFocus
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(false)}
                                className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer"
                            >
                                Créer
                            </button>
                        </div>
                    </form>
                </div>
            </PopUp>

            {/* POPUP : REJOINDRE UN ESPACE */}
            <PopUp IsOpen={isJoinOpen}>
                <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-extrabold text-slate-900">Rejoindre un espace</h3>
                        <button 
                            type="button" 
                            onClick={() => setIsJoinOpen(false)}
                            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={submitJoinSpace} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-700">Nom de l'espace à rejoindre</label>
                            <input 
                                type="text"
                                placeholder="Ex: Révisions partiels"
                                value={joinSpaceTitle}
                                onChange={(e) => setJoinSpaceTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/30"
                                autoFocus
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsJoinOpen(false)}
                                className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer"
                            >
                                Demander l'accès
                            </button>
                        </div>
                    </form>
                </div>
            </PopUp>

        </div>
    );
}