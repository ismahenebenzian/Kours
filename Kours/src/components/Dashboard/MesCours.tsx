
import type { Course } from '../Types';
import { useState } from 'react';
import { 
  Star, 
  Plus, 
} from 'lucide-react';
import FiltersCard from './FiltersCard';
import StatsCard from './StatsCard';
import CoursCard from './CourCard';


type filters = 'deposes' | 'favoris' | 'quiz' | 'notes';
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<filters>('deposes');
  const filters: filters[] = ['deposes', 'favoris', 'quiz', 'notes'];

  // Données factices calquées sur votre maquette
  const courses: Course[] = [
    {
      id: '1',
      title: 'Normalisation des bases de données',
      type: 'Cours complet',
      status: 'Publié',
      domain: 'Informatique',
      level: 'BUT 2',
      university: 'Université de Lyon',
      author: 'M. Garnier (enseignant)',
      year: '2025–2026',
      rating: 4.7,
      likes: 182,
      comments: 24,
    },
    {
      id: '2',
      title: 'Modèle relationnel et algèbre relationnelle',
      type: 'Cours complet',
      status: 'Privé',
      domain: 'Informatique',
      level: 'BUT 2',
      university: 'Université de Lyon',
      author: 'M. Garnier (enseignant)',
      year: '2025–2026',
      rating: '—',
      likes: 0,
      comments: 0,
    },
    {
      id: '3',
      title: 'SQL : jointures et sous-requêtes',
      type: 'Fiche révision',
      status: 'Privé',
      domain: 'Informatique',
      level: 'BUT 2',
      university: 'Université de Lille',
      author: 'M. Garnier (enseignant)',
      year: '2025–2026',
      rating: 4.8,
      likes: 182,
      comments: 24,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mes cours</h1>
          <button 
            type="button"
            className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-sm transition-all text-sm"
          >
            Déposer un cours
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/60 pb-4">
          <FiltersCard
            filters={filters}
            activeFilter={activeTab}
            onFilterChange={setActiveTab}
            getFilterCount={(filter) => {
              switch (filter) {
                case 'deposes':
                  return 3;
                case 'favoris':
                  return 1;
                case 'quiz':
                  return 2;
                case 'notes':
                  return 4;
                default:
                  return 0;
              }
            }}
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Vues totales" value="1240" />
       
          <StatsCard title="Note moyenne" value="4,7" icon={<Star className="w-5 h-5 fill-slate-900 text-slate-900" />} />
         
          <StatsCard title="J'aime reçus" value="546" />
        </div>

        {/* GRILLE DES COURS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CoursCard key={course.id} course={course} />
          ))}
        </div>

        {/* SECTION INFÉRIEURE : Bannière "Partage un nouveau cours" */}
        <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Partage un nouveau cours</h4>
              <p className="text-xs text-slate-500 mt-0.5">Dépose 1 à 2 cours pour débloquer les lectures illimitées.</p>
            </div>
          </div>
          <button 
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-3 rounded-2xl shadow-sm transition-all shrink-0"
          >
            Déposer maintenant
          </button>
        </div>

      </div>
    </div>
  );
}

