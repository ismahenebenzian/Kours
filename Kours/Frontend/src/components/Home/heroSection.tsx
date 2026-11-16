import React, { useState } from 'react';
import { Search } from 'lucide-react';
import HeroPreviewImg from '../../assets/home/hero-preview.svg';
import CardNewCourseImg from '../../assets/home/div.svg';
import CardQuizImg from '../../assets/home/card-quiz.svg';

const HeroSection: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const quickTags = ['Droit', 'Médecine', 'Informatique', 'Économie'];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Recherche :', searchQuery);
    };

    return (
        <section className=" flex min-h-[600px]  text-white ">

            <div className="px-30 grid w-full grid-cols-1 lg:grid-cols-12">

                {/* COLONNE GAUCHE : Textes et recherche */}
                <div className="flex flex-col justify-center space-y-6 lg:col-span-7">

                    {/* Titre principal */}
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Tous les cours de <br />
                        <span className="text-[#FBBF24]">
                            tous les campus,
                        </span>{' '}
                        <br />
                        gratuits.
                    </h1>

                    {/* Description */}
                    <p className="max-w-2xl text-base font-normal leading-relaxed text-slate-300 sm:text-lg">
                        Cours, fiches, résumés et quiz partagés par des étudiants.
                        <br className="hidden sm:inline" />
                        Trouve ce qu'il te manque, révise, et partage à ton tour.
                    </p>

                    {/* Barre de recherche */}
                    <form onSubmit={handleSearch} className="w-full max-w-2xl">
                        <div className="flex items-center rounded-xl bg-white p-1.5 shadow-lg transition-all focus-within:ring-4 focus-within:ring-amber-400/30">

                            <div className="pl-3 text-slate-400">
                                <Search className="h-5 w-5" />
                            </div>

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Matière, mot-clé, établissement..."
                                className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none sm:text-base"
                            />

                            <button
                                type="submit"
                                className="shrink-0 rounded-xl bg-[#F59E0B] px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-[#FBBF24] sm:px-8"
                            >
                                Rechercher
                            </button>

                        </div>
                    </form>

                    {/* Tags rapides */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <span className="mr-1 text-sm text-slate-300">
                            Pour commencer :
                        </span>

                        {quickTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setSearchQuery(tag)}
                                className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-900 shadow-sm transition-colors hover:bg-amber-400 sm:text-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                </div>

                {/* COLONNE DROITE : Illustrations */}
                <div className="relative mt-8 flex items-center justify-center lg:col-span-5 lg:mt-0">

                    <div className="relative w-full">

                        {/* Aperçu principal */}
                        <img
                            src={HeroPreviewImg}
                            alt="Aperçu de la plateforme Kours"
                            className="h-auto w-full rounded-2xl drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
                        />

                        {/* Carte nouveau cours */}
                        <div className="relative -top-0 -left-6 w-[170px] drop-shadow-xl sm:-left-8 sm:w-[220px]">
                            <img
                                src={CardNewCourseImg}
                                alt="Notification nouveau cours"
                                className="h-auto w-full"
                            />
                        </div>

                        {/* Carte quiz */}
                        <div className="absolute -bottom-8 -right-3 w-[180px] drop-shadow-2xl sm:-right-6 sm:w-[230px]">
                            <img
                                src={CardQuizImg}
                                alt="Aperçu du quiz"
                                className="h-auto w-full"
                            />
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;