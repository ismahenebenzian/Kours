
import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';

import { Search, X } from 'lucide-react';

import HeroPreviewImg from '../../assets/home/hero-preview.svg';
import CardNewCourseImg from '../../assets/home/div.svg';
import CardQuizImg from '../../assets/home/card-quiz.svg';
import { useNavigate } from 'react-router-dom';

type OriginalLayout = {
    rect: DOMRect;
    style: string | null;
};

const HeroSection: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const searchWrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const originalLayoutRef = useRef<OriginalLayout | null>(null);
    const animationTimeoutRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const quickTags = [
        'Droit',
        'Médecine',
        'Informatique',
        'Économie',
    ];

    const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

    // OUVRIR LA RECHERCHE
    const openSearch = useCallback(() => {
        const wrapper = searchWrapperRef.current;

        if (!wrapper || originalLayoutRef.current) return;

        const rect = wrapper.getBoundingClientRect();

        // Mémoriser la position et les styles initiaux
        originalLayoutRef.current = {
            rect,
            style: wrapper.getAttribute('style'),
        };

        // Position initiale avant animation
        wrapper.style.transition = 'none';
        wrapper.style.position = 'fixed';
        wrapper.style.top = `${rect.top}px`;
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.width = `${rect.width}px`;
        wrapper.style.transform = 'none';
        wrapper.style.zIndex = '9999';
        wrapper.style.maxWidth = 'none';
        wrapper.style.willChange = 'top, left, width, transform';

        // Déclencher l'animation après le positionnement initial
        animationFrameRef.current = requestAnimationFrame(() => {
            wrapper.style.transition = `
                top 500ms ${ease},
                left 500ms ${ease},
                width 500ms ${ease},
                transform 500ms ${ease}
            `;

            wrapper.style.top = '40%';
            wrapper.style.left = '50%';
            wrapper.style.width = 'min(720px, 92vw)';
            wrapper.style.transform = 'translateX(-50%)';
        });

        setIsFocused(true);
    }, []);

    // FERMER LA RECHERCHE
    const closeSearch = useCallback(() => {
        const wrapper = searchWrapperRef.current;
        const original = originalLayoutRef.current;

        if (!wrapper || !original) {
            setIsFocused(false);
            return;
        }

        // Annuler une éventuelle animation précédente
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        if (animationTimeoutRef.current !== null) {
            window.clearTimeout(animationTimeoutRef.current);
        }

        // Récupérer la position actuelle
        const currentRect = wrapper.getBoundingClientRect();

        // Repositionner sans animation pour préparer le retour
        wrapper.style.transition = 'none';
        wrapper.style.position = 'fixed';
        wrapper.style.top = `${currentRect.top}px`;
        wrapper.style.left = `${currentRect.left}px`;
        wrapper.style.width = `${currentRect.width}px`;
        wrapper.style.transform = 'none';

        // Forcer le navigateur à appliquer les styles
        wrapper.offsetHeight;

        // Animer vers la position initiale
        animationFrameRef.current = requestAnimationFrame(() => {
            wrapper.style.transition = `
                top 500ms ${ease},
                left 500ms ${ease},
                width 500ms ${ease},
                transform 500ms ${ease}
            `;

            wrapper.style.top = `${original.rect.top}px`;
            wrapper.style.left = `${original.rect.left}px`;
            wrapper.style.width = `${original.rect.width}px`;
            wrapper.style.transform = 'none';
        });

        setIsFocused(false);

        // Restaurer les styles initiaux après l'animation
        animationTimeoutRef.current = window.setTimeout(() => {
            if (wrapper && originalLayoutRef.current) {
                const originalStyle = originalLayoutRef.current.style;

                if (originalStyle !== null) {
                    wrapper.setAttribute('style', originalStyle);
                } else {
                    wrapper.removeAttribute('style');
                }

                originalLayoutRef.current = null;
            }

            animationTimeoutRef.current = null;
        }, 550);
    }, []);

    // FERMETURE AVEC ESCAPE
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFocused) {
                closeSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFocused, closeSearch]);

    // NETTOYAGE DES ANIMATIONS
    useEffect(() => {
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            if (animationTimeoutRef.current !== null) {
                window.clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);
    const navigate = useNavigate()

    // RECHERCHE
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        console.log('Recherche :', searchQuery);
        navigate('/explore')

        closeSearch();
    };

    // SÉLECTION D'UN TAG
    const selectTag = (tag: string) => {
        setSearchQuery(tag);
        openSearch();

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };

    return (
        <section className="relative isolate flex min-h-[600px] text-white">

            {/* BACKDROP */}
            <div
                onMouseDown={closeSearch}
                className={`
                    fixed inset-0 z-40
                    bg-slate-950/60 backdrop-blur-sm
                    transition-opacity duration-500
                    ${isFocused
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                    }
                `}
            />

            <div className="grid w-full grid-cols-1 px-30 lg:grid-cols-12">

                {/* COLONNE GAUCHE */}
                <div className="flex flex-col justify-center space-y-6 lg:col-span-7 transition-all">

                    {/* TITRE */}
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Tous les cours de <br />

                        <span className="text-[#FBBF24]">
                            tous les campus,
                        </span>{' '}

                        <br />
                        gratuits.
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="max-w-2xl text-base font-normal leading-relaxed text-slate-300 sm:text-lg">
                        Cours, fiches, résumés et quiz partagés par des étudiants.
                        <br className="hidden sm:inline" />
                        Trouve ce qu'il te manque, révise, et partage à ton tour.
                    </p>
                    {/* TAGS RAPIDES */}
                   
                        <div className="flex flex-wrap items-center gap-3 pt-1">

                            <span className="mr-1 text-sm text-slate-300">
                                Pour commencer :
                            </span>

                            {quickTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => selectTag(tag)}
                                    className="
                                        rounded-full bg-white px-4 py-1.5
                                        text-xs font-medium text-slate-900
                                        shadow-sm transition-colors
                                        hover:bg-amber-400 sm:text-sm
                                    "
                                >
                                    {tag}
                                </button>
                            ))}

                        </div>
                    

                    {/* BARRE DE RECHERCHE */}
                    <div
                        ref={searchWrapperRef}
                        className="relative z-50 w-full max-w-2xl"
                    >

                        <form
                            onSubmit={handleSearch}
                            className="w-full"
                        >

                            <div
                                className={`
                                    flex items-center rounded-2xl
                                    bg-white p-2 shadow-2xl
                                    transition-shadow duration-300
                                    ${isFocused
                                        ? 'ring-4 ring-amber-400/50 shadow-amber-500/10'
                                        : 'focus-within:ring-4 focus-within:ring-amber-400/30'
                                    }
                                `}
                            >

                                {/* ICÔNE */}
                                <div className="pl-3 text-slate-400">
                                    <Search className="h-5 w-5" />
                                </div>

                                {/* INPUT */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={openSearch}
                                    placeholder="Matière, mot-clé, établissement..."
                                    className="
                                        w-full min-w-0
                                        bg-transparent px-3 py-3
                                        text-sm text-slate-800
                                        placeholder-slate-400
                                        focus:outline-none sm:text-base
                                    "
                                />

                                {/* FERMER */}
                                {isFocused && (
                                    <button
                                        type="button"
                                        onClick={closeSearch}
                                        className="
                                            mr-2 rounded-xl p-2
                                            text-slate-400
                                            transition hover:bg-slate-100
                                            hover:text-slate-800
                                        "
                                        aria-label="Fermer la recherche"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}

                                {/* RECHERCHER */}
                                <button
                                    type="submit"
                                    className="
                                        shrink-0 rounded-xl
                                        bg-[#F59E0B] px-5 py-3
                                        font-semibold text-slate-950
                                        transition-colors hover:bg-[#FBBF24]
                                        sm:px-8
                                    "
                                >
                                    Rechercher
                                </button>

                            </div>

                        </form>

                        {/* SUGGESTIONS */}
                        {isFocused && (
                            <div
                                className="
                                    absolute left-0 right-0 top-full z-50 mt-3
                                    overflow-hidden rounded-2xl
                                    bg-white shadow-2xl
                                    animate-in fade-in slide-in-from-top-2
                                    duration-300
                                "
                            >

                                <div className="p-4 text-slate-800">

                                    <p className="
                                        mb-3 text-xs font-semibold
                                        uppercase tracking-wider text-slate-400
                                    ">
                                        Recherches populaires & Suggestions
                                    </p>

                                    <div className="space-y-1">

                                        {quickTags.map((tag) => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => setSearchQuery(tag)}
                                                className="
                                                    flex w-full items-center gap-3
                                                    rounded-xl px-3 py-3
                                                    text-left text-sm font-medium
                                                    text-slate-700
                                                    transition-colors hover:bg-amber-50
                                                "
                                            >
                                                <Search className="h-4 w-4 text-slate-400" />

                                                Cours de {tag}
                                            </button>
                                        ))}

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                    

                </div>

                {/* COLONNE DROITE : ILLUSTRATIONS */}
                <div className="relative mt-8 flex items-center justify-center lg:col-span-5 lg:mt-0">

                    <div className="relative w-full">

                        <img
                            src={HeroPreviewImg}
                            alt="Aperçu de la plateforme Kours"
                            className="
                                h-auto w-full rounded-2xl
                                drop-shadow-2xl transition-transform
                                duration-300 hover:scale-[1.01]
                            "
                        />

                        <div className="
                            relative -top-0 -left-6 w-[170px]
                            drop-shadow-xl sm:-left-8 sm:w-[220px]
                        ">
                            <img
                                src={CardNewCourseImg}
                                alt="Notification nouveau cours"
                                className="h-auto w-full"
                            />
                        </div>

                        <div className="
                            absolute -bottom-8 -right-3 w-[180px]
                            drop-shadow-2xl sm:-right-6 sm:w-[230px]
                        ">
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
