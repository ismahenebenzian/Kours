
import { useState } from "react";
import { Sparkles, Minus, Plus} from "lucide-react";
import PopUp from "./PopUp";

type GeneratedOption = {
    text: string;
    isCorrect: boolean;
};

type GeneratedQuestion = {
    text: string;
    options: GeneratedOption[];
};

type QuizQuestion = {
    id: number;
    text: string;
    isExpanded: boolean;
    options: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
};

type GenererAvecIAProps = {
    courseText: string;
    onGenerate: (questions: QuizQuestion[]) => void;
};

export default function GenererAvecIA({
    courseText,
    onGenerate
}: GenererAvecIAProps) {

    const [aiCount, setAiCount] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateQuiz = async () => {
        if (!courseText.trim()) {
            setError("Le texte du cours est vide.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch("http://localhost:3000/api/generate-quiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseText,
                    count: aiCount
                })
            });

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData.error || "Erreur lors de la génération du quiz."
                );
            }

            const data = await response.json();
            console.log(data)

            const generatedQuestions: GeneratedQuestion[] = data.questions;

            if (!Array.isArray(generatedQuestions)) {
                throw new Error("Format de réponse invalide.");
            }

            const formattedQuestions: QuizQuestion[] =
                generatedQuestions.map((question, index) => ({
                    id: Date.now() + index,
                    text: question.text,
                    isExpanded: false,
                    options: question.options.map((option, optionIndex) => ({
                        id: `${Date.now()}-${index}-${optionIndex}`,
                        text: option.text,
                        isCorrect: option.isCorrect
                    }))
                }));

            onGenerate(formattedQuestions);

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Une erreur inconnue est survenue."
            );
        } finally {
            setLoading(false);
        }
    };

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
                    Les questions sont créées à partir du texte du cours.
                </p>
            </div>

            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-indigo-100 shadow-xs">

                <span className="text-xs font-bold text-slate-700">
                    Nombre de questions
                </span>

                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        disabled={aiCount <= 1 || loading}
                        onClick={() => setAiCount(Math.max(1, aiCount - 1))}
                        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-40"
                    >
                        <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-xs font-extrabold text-slate-900 w-5 text-center">
                        {aiCount}
                    </span>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setAiCount(aiCount + 1)}
                        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-40"
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </button>

                </div>
            </div>

            {error && (
                <p className="text-xs text-red-600">
                    {error}
                </p>
            )}

            <button
                type="button"
                onClick={generateQuiz}
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all disabled:opacity-60"
            >
                {loading
                    ? "Génération en cours..."
                    : `Générer ${aiCount} questions`}
            </button>

            {
             loading ? 
                

                <PopUp>  <h1>OUUI </h1></PopUp>

                :

                null
              
            }
        </div>
    );
}
