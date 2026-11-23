import { useState } from 'react';
import {
    Plus,
    Trash2,
    Edit3,
    Check,
    Globe,

    X,
} from 'lucide-react';
import QuizDemo from './QuizDemo';
import type { Question, CreateQuizProps, } from '../Types';
import GenererAvecIA from "../GenererAvecIA"

    const courseText = `
Cours : Introduction à Git et GitHub

Git est un système de contrôle de version décentralisé qui permet
de suivre l'historique des modifications d'un projet informatique.
Il a été créé par Linus Torvalds en 2005.

GitHub est une plateforme web hébergeant des dépôts Git,
facilitant la collaboration et le travail en équipe.

Le fonctionnement de Git repose sur trois états principaux :
- Le répertoire de travail (Working Directory) : les fichiers modifiés en local.
- La zone d'index (Staging Area) : l'antichambre des modifications prêtes à être enregistrées.
- Le dépôt local (Repository) : l'historique complet des versions enregistrées.

Quelques commandes Git fondamentales :

- git init : initialise un nouveau dépôt Git local.
- git clone : télécharge un dépôt distant sur sa machine.
- git status : affiche l'état des fichiers (modifiés, suivis, non suivis).
- git add : ajoute des fichiers à la zone d'index.
- git commit : enregistre les modifications de l'index dans l'historique.
- git push : envoie les commits locaux vers le dépôt distant (GitHub).
- git pull : récupère et fusionne les modifications distantes en local.
- git branch : gère les branches de développement.
- git checkout ou git switch : permet de changer de branche.
- git merge : fusionne une branche avec une autre.

Le système de branches (branching) permet de travailler sur de
nouvelles fonctionnalités ou corrections sans modifier la version
principale (souvent appelée main ou master) du projet.

Une Pull Request (ou Merge Request) est une demande de fusion
de code sur GitHub, permettant d'analyser, de commenter et de
valider le code avant de l'intégrer au projet commun.
`;
export default function Quiz({ onSave, onPublish }: CreateQuizProps) {
    const [quizTitle, setQuizTitle] = useState("QCM Linux débutant");
    const [associatedCourse, setAssociatedCourse] = useState("Systeme");
    const [visibility, setVisibility] = useState("Public");
    const [demoState, setDemoState] = useState<boolean>(false);

    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            text: "",
            isExpanded: true,
            options: [
                { id: '1', text: "", isCorrect: true },
                { id: '2', text: "", isCorrect: false },
            ],
        },
    ]);

    const toggleQuestion = (id: number) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, isExpanded: !q.isExpanded } : q));
    };

    const deleteQuestion = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addQuestion = () => {
        const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        const newQuestion: Question = {
            id: newId,
            text: "",
            isExpanded: true,
            options: [
                { id: '1', text: "", isCorrect: true },
                { id: '2', text: "", isCorrect: false },
            ]
        };
        setQuestions([...questions, newQuestion]);
    };

    const setCorrectOption = (questionId: number, optionId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: q.options.map(opt => ({
                        ...opt,
                        isCorrect: opt.id === optionId
                    }))
                };
            }
            return q;
        }));
    };

    // Ajouter une option à une question spécifique
    const addOptionToQuestion = (questionId: number) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const nextId = String(Date.now());
                return {
                    ...q,
                    options: [
                        ...q.options,
                        { id: nextId, text: "", isCorrect: q.options.length === 0 }
                    ]
                };
            }
            return q;
        }));
    };

    // Supprimer une option d'une question spécifique
    const deleteOptionFromQuestion = (questionId: number, optionId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                // Empêcher d'avoir moins de 2 options
                if (q.options.length <= 2) return q;

                const filteredOptions = q.options.filter(opt => opt.id !== optionId);

                // Si l'option supprimée était la bonne réponse, définir la première restante comme bonne
                const wasCorrect = q.options.find(opt => opt.id === optionId)?.isCorrect;
                if (wasCorrect && filteredOptions.length > 0) {
                    filteredOptions[0].isCorrect = true;
                }

                return { ...q, options: filteredOptions };
            }
            return q;
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50/60 p-6 sm:p-10 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* EN-TÊTE PRINCIPAL */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                        Créer un quiz
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Crée tes questions à la main ou génère-les à partir du cours.
                    </p>
                </div>

                {/* INFOS DU QUIZ */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Titre du quiz
                        </label>
                        <input
                            type="text"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-slate-50/30"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Cours associé
                        </label>
                        <input
                            type="text"
                            value={associatedCourse}
                            onChange={(e) => setAssociatedCourse(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-slate-50/30"
                        />
                    </div>
                </div>

                {/* CONTENU PRINCIPAL */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LISTE DES QUESTIONS */}
                    <div className="lg:col-span-2 space-y-4">

                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                            >
                                {q.isExpanded ? (
                                    <div className="p-6 sm:p-8 space-y-6">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <span className="font-extrabold text-slate-900 text-base">
                                                Question {index + 1}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={(e) => deleteQuestion(q.id, e)}
                                                className="text-xs font-semibold text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Supprimer
                                            </button>
                                        </div>

                                        {/* Énoncé */}
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-slate-700">
                                                Énoncé
                                            </label>
                                            <input
                                                type="text"
                                                value={q.text}
                                                onChange={(e) => {
                                                    const updated = [...questions];
                                                    updated[index].text = e.target.value;
                                                    setQuestions(updated);
                                                }}
                                                placeholder="Ex: Quelle est la capitale de la France ?"
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all bg-slate-50/30"
                                            />
                                        </div>

                                        {/* Options de réponse dynamiques */}
                                        <div className="space-y-3">
                                            <label className="block text-xs font-bold text-slate-700">
                                                Réponses (cochez la bonne réponse)
                                            </label>

                                            {q.options.map((opt, optIndex) => (
                                                <div key={opt.id} className="flex items-center gap-3 group">
                                                    {/* Bouton radio sélection bonne réponse */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setCorrectOption(q.id, opt.id)}
                                                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all cursor-pointer ${opt.isCorrect
                                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-600 ring-2 ring-emerald-500/20'
                                                            : 'border-slate-300 hover:border-slate-400 bg-white'
                                                            }`}
                                                    >
                                                        {opt.isCorrect && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                                    </button>

                                                    {/* Champ texte option */}
                                                    <input
                                                        type="text"
                                                        value={opt.text}
                                                        onChange={(e) => {
                                                            const updated = [...questions];
                                                            updated[index].options[optIndex].text = e.target.value;
                                                            setQuestions(updated);
                                                        }}
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 transition-all bg-slate-50/20"
                                                    />

                                                    {/* Bouton supprimer l'option (actif uniquement si > 2 options) */}
                                                    {q.options.length > 2 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteOptionFromQuestion(q.id, opt.id)}
                                                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                                            title="Supprimer cette option"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Bouton Ajouter une option */}
                                            <button
                                                type="button"
                                                onClick={() => addOptionToQuestion(q.id)}
                                                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                Ajouter une option
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => toggleQuestion(q.id)}
                                        className="p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                                    >
                                        <span className="font-extrabold text-slate-900 text-base">
                                            Question {index + 1}
                                        </span>
                                        <button
                                            type="button"
                                            className="text-xs font-semibold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                            Modifier
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addQuestion}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter une question
                        </button>
                        <button
                            type="button"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer"
                            onClick={() => { setDemoState(true) }}
                        >
                            Lancer une demo du quiz
                        </button>
                    </div>

                    {/* SIDEBAR  */}
                    <div className="space-y-6">

                        <GenererAvecIA
                            courseText={courseText}
                            onGenerate={(generatedQuestions) => {
                                setQuestions(generatedQuestions);
                            }}
                        />

                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                            <h2 className="font-extrabold text-slate-900 text-base">
                                Publication
                            </h2>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <select
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/30 text-slate-800 text-sm focus:outline-none focus:border-indigo-600 cursor-pointer"
                                >
                                    <option value="Public">Public</option>
                                    <option value="Privé">Privé</option>
                                    <option value="Restreint">Restreint</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => onPublish && onPublish({ quizTitle, associatedCourse, questions })}
                                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xs transition-all cursor-pointer"
                            >
                                Publier le quiz
                            </button>

                            <button
                                type="button"
                                onClick={() => onSave && onSave({ quizTitle, associatedCourse, questions })}
                                className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all cursor-pointer"
                            >
                                Enregistrer le brouillon
                            </button>
                        </div>

                    </div>

                </div>


            </div>
            {
                demoState && (
                <QuizDemo questions={questions} onClose={() => setDemoState(false)} />
            )}
        </div>
    );
}