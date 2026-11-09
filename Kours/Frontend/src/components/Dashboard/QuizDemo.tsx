import { useState } from 'react';
import { X, ChevronLeft,  XCircle, RotateCcw, BookOpen } from 'lucide-react';
import type { Question } from '../Types';

interface QuizDemoProps {
    questions: Question[];
    quizTitle?: string;
    onClose: () => void;
}

export default function QuizDemo({ questions, quizTitle = "Quiz interactif", onClose }: QuizDemoProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    if (!questions || questions.length === 0) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
                    <h3 className="text-xl font-bold text-slate-900">Aucune question disponible</h3>
                    <p className="text-sm text-slate-500">Veuillez ajouter au moins une question pour lancer la démo.</p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl transition-all cursor-pointer"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

    const handleSelectOption = (optionId: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentIndex]: optionId
        });
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true); // Passer à l'écran de résultats
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const restartQuiz = () => {
        setSelectedAnswers({});
        setCurrentIndex(0);
        setIsFinished(false);
    };

    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Calcul du score final
    let correctCount = 0;
    const incorrectQuestions: { question: Question; userOptionText?: string; correctOptionText?: string }[] = [];

    questions.forEach((q, idx) => {
        const userSelectedId = selectedAnswers[idx];
        const correctOpt = q.options.find(opt => opt.isCorrect);
        const userOpt = q.options.find(opt => opt.id === userSelectedId);

        if (userSelectedId && correctOpt && userSelectedId === correctOpt.id) {
            correctCount++;
        } else {
            incorrectQuestions.push({
                question: q,
                userOptionText: userOpt?.text || "Aucune réponse",
                correctOptionText: correctOpt?.text || "Non définie"
            });
        }
    });

    const successPercentage = Math.round((correctCount / totalQuestions) * 100);
    const pointsGagnés = correctCount * 10;

    // --- ÉCRAN DES RÉSULTATS ---
    if (isFinished) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-200">
                <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-2xl flex flex-col my-auto overflow-hidden border border-slate-200/80">
                    
                    {/* EN-TÊTE RÉSULTATS */}
                    <div className="px-6 sm:px-10 py-5 border-b border-slate-100 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                            <X className="w-4 h-4" />
                            Quitter
                        </button>

                        <div className="text-xs sm:text-sm font-bold text-slate-700 text-center truncate px-2">
                            {quizTitle}
                        </div>

                        <div className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-2xl border border-emerald-100">
                            Terminé
                        </div>
                    </div>

                    {/* CONTENU DU RAPPORT */}
                    <div className="p-6 sm:p-10 space-y-8 bg-slate-50/40 overflow-y-auto max-h-[80vh]">
                        
                        {/* CARTE SCORE PRINCIPAL */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center space-y-4">
                            {/* Cercle de score visuel */}
                            <div className="relative w-28 h-28 mx-auto flex items-center justify-center rounded-full border-4 border-indigo-600 bg-indigo-50/30 shadow-inner">
                                <span className="text-2xl font-extrabold text-slate-900">
                                    {correctCount}/{totalQuestions}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-extrabold text-slate-900">
                                    Bien joué !
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Tu as {correctCount} bonnes réponses sur {totalQuestions}. {incorrectQuestions.length > 0 ? `Il te reste ${incorrectQuestions.length} notions à revoir.` : "Parcours sans faute !"}
                                </p>
                            </div>
                        </div>

                        {/* STATS (3 BLOCS) */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
                                <div className="text-lg sm:text-xl font-extrabold text-slate-900">{successPercentage} %</div>
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">de réussite</div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
                                <div className="text-lg sm:text-xl font-extrabold text-slate-900">3 min</div>
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">de temps</div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
                                <div className="text-lg sm:text-xl font-extrabold text-emerald-600">+{pointsGagnés}</div>
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">points gagnés</div>
                            </div>
                        </div>

                        {/* SECTION À REVOIR (SI ERREURS) */}
                        {incorrectQuestions.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">À revoir</h4>
                                <div className="space-y-3">
                                    {incorrectQuestions.map((item, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-start gap-4 shadow-xs">
                                            <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                                                <XCircle className="w-4 h-4" />
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <div className="text-xs font-extrabold text-slate-900">{item.question.text}</div>
                                                <div className="text-xs text-slate-500">
                                                    Bonne réponse : <span className="font-bold text-slate-700">{item.correctOptionText}</span>
                                                </div>
                                            </div>
                                            <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 shrink-0 bg-indigo-50 px-2.5 py-1.5 rounded-xl border border-indigo-100">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                Cours
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BOUTONS FINAUX */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer"
                            >
                                Retour au cours
                            </button>
                            <button
                                type="button"
                                onClick={restartQuiz}
                                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Refaire le quiz
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // --- ÉCRAN DE QUESTION EN COURS (RESTES DU CODE DE DÉMO) ---
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-200">
            <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl flex flex-col my-auto overflow-hidden border border-slate-200/80">
                
                <div className="px-6 sm:px-10 py-5 border-b border-slate-100 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                        <X className="w-4 h-4" />
                        Quitter
                    </button>

                    <div className="text-xs sm:text-sm font-bold text-slate-700 text-center truncate px-2">
                        Quiz <span className="text-slate-400 font-normal">·</span> {quizTitle}
                    </div>

                    <div className="text-xs font-extrabold text-slate-500 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100">
                        Question {currentIndex + 1} / {totalQuestions}
                    </div>
                </div>

                <div className="px-6 sm:px-10 pt-6 space-y-4 bg-slate-50/40">
                    <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div 
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1.5 pb-2">
                        {questions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all cursor-pointer ${
                                    idx === currentIndex 
                                        ? 'w-6 bg-indigo-600' 
                                        : selectedAnswers[idx] !== undefined
                                            ? 'w-2 bg-indigo-300'
                                            : 'w-2 bg-slate-200'
                                }`}
                                title={`Question ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6 sm:p-10 flex-1 space-y-8 bg-slate-50/40">
                    <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                        
                        <div className="inline-block text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
                            Question {currentIndex + 1}
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                            {currentQuestion.text || "Énoncé de la question vide..."}
                        </h3>

                        <div className="space-y-3 pt-2">
                            {currentQuestion.options && currentQuestion.options.map((opt, optIndex) => {
                                const isSelected = selectedAnswers[currentIndex] === opt.id;
                                const letter = optionLetters[optIndex] || String(optIndex + 1);

                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => handleSelectOption(opt.id)}
                                        className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                                            isSelected 
                                                ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 shadow-xs ring-1 ring-indigo-600/20' 
                                                : 'border-slate-200/80 bg-white hover:bg-slate-50 text-slate-800'
                                        }`}
                                    >
                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-colors ${
                                            isSelected 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {letter}
                                        </span>
                                        <span className="text-sm font-semibold flex-1">
                                            {opt.text || `Option ${optIndex + 1}`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                                    currentIndex === 0 
                                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200' 
                                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs'
                                }`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Précédent
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xs transition-all cursor-pointer"
                            >
                                {currentIndex === totalQuestions - 1 ? 'Terminer' : 'Valider'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}