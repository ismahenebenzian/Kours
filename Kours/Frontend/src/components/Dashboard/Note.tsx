import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UnderlineExtension from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import HighlightExtension from '@tiptap/extension-highlight';

import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  Link as LinkIcon, 
  Highlighter, 
  Heading1,
  Heading2,
  Save, 
  ArrowLeft, 
  CheckCircle2,
  ListOrdered
} from 'lucide-react';

interface NotesProps {
  onClose?: () => void;
  initialContent?: string;
  onSave?: (data: { title: string; htmlContent: string }) => void;
}

export default function Notes({ onClose, initialContent, onSave }: NotesProps) {
  const [title, setTitle] = useState("Notes - Bases de données");
  const [isSaved, setIsSaved] = useState(false);

  // Configuration de l'éditeur WYSIWYG Tiptap
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      UnderlineExtension,
      HighlightExtension.configure({ multicolor: true }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline cursor-pointer',
        },
      }),
    ],
    content: initialContent || `
      <h2>Chapitre 1 : Introduction aux BDD</h2>
      <p>Les bases de données relationnelles utilisent le langage <strong>SQL</strong> pour structurer l'information.</p>
      <ul>
        <li>Tables et Clés primaires</li>
        <li>Jointures (INNER JOIN, LEFT JOIN)</li>
      </ul>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[350px] p-6 sm:p-8 text-slate-800 leading-relaxed',
      },
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    const htmlContent = editor.getHTML();
    
    // Callback si vous gérez l'enregistrement en backend
    if (onSave) {
      onSave({ title, htmlContent });
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL du lien :', previousUrl);

    if (url === null) return; // Annulé

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10 flex flex-col">
      <div className="max-w-5xl mx-auto w-full space-y-6 flex-1 flex flex-col">
        
        {/* EN-TÊTE : Titre & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <input 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none w-full bg-transparent transition-colors py-1"
              onFocus={(e) => e.target.select()} 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
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

        {/* CONTENEUR DU TRAITEMENT DE TEXTE */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 flex-1 flex flex-col overflow-hidden">
          
          {/* BARRE D'OUTILS DE MISE EN FORME */}
          {editor && (
            <div className="bg-slate-50/60 border-b border-slate-200/80 px-4 py-2.5 flex flex-wrap items-center gap-1 text-slate-600">
              
              {/* Gras */}
              <button 
                type="button" 
                title="Gras (Ctrl+B)" 
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  editor.isActive('bold') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Bold className="w-3.5 h-3.5" />
                <span>B</span>
              </button>

              {/* Italique */}
              <button 
                type="button" 
                title="Italique (Ctrl+I)" 
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-2.5 py-1.5 rounded-xl text-xs italic transition-colors cursor-pointer flex items-center gap-1 ${
                  editor.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Italic className="w-3.5 h-3.5" />
                <span>I</span>
              </button>

              {/* Souligné */}
              <button 
                type="button" 
                title="Souligné (Ctrl+U)" 
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`px-2.5 py-1.5 rounded-xl text-xs underline transition-colors cursor-pointer flex items-center gap-1 ${
                  editor.isActive('underline') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <UnderlineIcon className="w-3.5 h-3.5" />
                <span>U</span>
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1" />

              {/* Titre 1 */}
              <button 
                type="button" 
                title="Titre Principal" 
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  editor.isActive('heading', { level: 1 }) ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Heading1 className="w-3.5 h-3.5" />
                <span>H1</span>
              </button>

              {/* Titre 2 */}
              <button 
                type="button" 
                title="Sous-titre" 
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  editor.isActive('heading', { level: 2 }) ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Heading2 className="w-3.5 h-3.5" />
                <span>H2</span>
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1" />

              {/* Liste à puces */}
              <button 
                type="button" 
                title="Liste à puces" 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Puces</span>
              </button>

              {/* Liste numérotée */}
              <button 
                type="button" 
                title="Liste numérotée" 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Numérotée</span>
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1" />

              {/* Lien */}
              <button 
                type="button" 
                title="Insérer / Modifier un lien" 
                onClick={setLink}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  editor.isActive('link') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Lien</span>
              </button>

              {/* Surligner */}
              <button 
                type="button" 
                title="Surligner" 
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  editor.isActive('highlight') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <Highlighter className="w-3.5 h-3.5 text-amber-500" />
                <span>Surligner</span>
              </button>

            </div>
          )}

          {/* ZONE D'ÉDITION RECTANGLE HTML */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <EditorContent editor={editor} className="flex-1" />
          </div>

        </div>

      </div>
    </div>
  );
}