import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Link as LinkIcon, 
  Highlighter, 
  Save, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';

interface NotesProps {
  onClose?: () => void;
}

export default function Notes({ onClose }: NotesProps) {
  const [title, setTitle] = useState("Notes - - Bases de données");
  const [content, setContent] = useState("Chapitre 1\n\n...");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de l'enregistrement
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10 flex flex-col">
      <div className="max-w-5xl mx-auto w-full space-y-6 flex-1 flex flex-col">
        
        {/* EN-TÊTE : Bouton Retour (optionnel) & Titre de la page */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <input className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight border-b border-slate-200 focus:border-indigo-600 focus:outline-none" onFocus={(e) => e.target.select()} onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>

          {/* Bouton Enregistrer (style Word) & Notification de succès */}
          <div className="flex items-center gap-3">
            {isSaved && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-2xl border border-emerald-100 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4" />
                Enregistré !
              </div>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
          </div>
        </div>

        {/* CONTENEUR PRINCIPAL DU TRAITEMENT DE TEXTE */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 flex-1 flex flex-col overflow-hidden">
          
          {/* BARRE D'OUTILS DE MISE EN FORME */}
          <div className="bg-slate-50/60 border-b border-slate-200/80 px-4 py-2.5 flex flex-wrap items-center gap-1.5 text-slate-600">
            <button 
              type="button" 
              title="Gras" 
              className="px-2.5 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Bold className="w-3.5 h-3.5" />
              <span>B</span>
            </button>

            <button 
              type="button" 
              title="Italique" 
              className="px-2.5 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs italic transition-colors cursor-pointer flex items-center gap-1"
            >
              <Italic className="w-3.5 h-3.5" />
              <span>I</span>
            </button>

            <button 
              type="button" 
              title="Souligné" 
              className="px-2.5 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <Underline className="w-3.5 h-3.5" />
              <span>U</span>
            </button>

            <div className="w-[1px] h-5 bg-slate-200 mx-1" />

            <button 
              type="button" 
              title="Titre" 
              className="px-3 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Titre
            </button>

            <button 
              type="button" 
              title="Liste" 
              className="px-3 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <List className="w-3.5 h-3.5" />
              <span>Liste</span>
            </button>

            <button 
              type="button" 
              title="Lien" 
              className="px-3 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Lien</span>
            </button>

            <button 
              type="button" 
              title="Surligner" 
              className="px-3 py-1.5 hover:bg-slate-200/60 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Highlighter className="w-3.5 h-3.5" />
              <span>Surligner</span>
            </button>
          </div>

          {/* ZONE DE TEXTE ÉDITABLE */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Commencez à rédiger vos notes ici..."
              className="w-full flex-1 resize-none focus:outline-none text-slate-800 text-sm leading-relaxed bg-transparent font-sans"
            />
          </div>

        </div>

      </div>
    </div>
  );
}