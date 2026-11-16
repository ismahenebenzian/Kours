import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 pt-6 pb-2 transition-all duration-300 animate-fade-in">
            {/* Bouton Précédent */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
            >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
            </button>

            {/* Indicateurs de pages */}
            <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;

                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            onClick={() => onPageChange(pageNumber)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? 'bg-indigo-600 text-white shadow-sm scale-105'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            {/* Bouton Suivant */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
            >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}