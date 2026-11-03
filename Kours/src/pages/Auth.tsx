import { useState } from 'react';
import Login from '../components/connextion-inscription/Login';
import Register from '../components/connextion-inscription/Register';
import Logo from '../components/Logo';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row">
      
      {/* COLONNE GAUCHE : Réduite à 1/3 de l'écran (ou 35%) */}
      <div className="w-full lg:w-1/3 min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-700 p-8 sm:p-12 text-white flex flex-col justify-between shrink-0">
        <div>
          <Logo />

          {/* Titre principal */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-6 mt-12">
            Partage ce que tu sais.<br />
            Retrouve ce dont tu as besoin.
          </h2>

          {/* Liste des avantages */}
          <ul className="space-y-4 text-xs sm:text-sm text-indigo-100">
            <li className="flex items-start">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-bold mr-2.5 mt-0.5 shrink-0">✓</span>
              Des cours de plusieurs établissements, réunis au même endroit
            </li>
            <li className="flex items-start">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-bold mr-2.5 mt-0.5 shrink-0">✓</span>
              Commentaires et notes sous chaque document
            </li>
            <li className="flex items-start">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-bold mr-2.5 mt-0.5 shrink-0">✓</span>
              Des quiz sourcés pour vérifier ce que tu apprends
            </li>
          </ul>
        </div>

        {/* Bas de colonne */}
        <div className="pt-6 border-t border-indigo-900/40">
          <p className="text-[11px] text-indigo-300 italic">
            Fait par des étudiants, pour des étudiants.
          </p>
        </div>
      </div>

      {/* COLONNE DROITE : Occupe le reste (2/3) et centre parfaitement le formulaire */}
      <div className="w-full lg:w-2/3 min-h-screen p-6 sm:p-12 flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          
          {/* Onglets de basculement Connexion / Inscription */}
          <div className="flex bg-slate-100/80 p-1 rounded-2xl mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                isLogin
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                !isLogin
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire dynamique */}
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}

        </div>
      </div>

    </div>
  );
}