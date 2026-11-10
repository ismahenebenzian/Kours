
export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 w-full text-gray-800">
      {/* Titre de la page */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon profil</h1>

      {/* Disposition globale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
        
        {/* Carte de gauche : Profil utilisateur */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-4 overflow-hidden">
            <svg className="w-16 h-16 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>

          <h2 className="font-bold text-gray-900 text-base">Camille</h2>
          <p className="text-[11px] text-gray-400 mt-1">IUT de Nevers - BUT 2 Informatique</p>

          {/* Badge Contributeur */}
          <span className="inline-block bg-emerald-50 text-emerald-500 text-[11px] font-medium px-3 py-1 rounded-full mt-3">
            Contributeur
          </span>

          {/* Barre de progression Lectures illimitées */}
          <div className="w-full mt-10 text-left">
            <div className="flex justify-between text-xs font-semibold text-gray-800 mb-2">
              <span>Lectures illimitées</span>
              <span className="text-gray-400 font-normal">1/3</span>
            </div>
            <div className="w-full bg-indigo-50 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
        </div>

        {/* Colonne de droite : Statistiques & Formulaire */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Statistiques (3 cartes indépendantes) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[11px] text-gray-400 font-medium">Cours déposés</p>
              <p className="text-xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[11px] text-gray-400 font-medium">J'aime reçus</p>
              <p className="text-xl font-bold text-gray-900 mt-1">546</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[11px] text-gray-400 font-medium">Points</p>
              <p className="text-xl font-bold text-gray-900 mt-1">320</p>
            </div>
          </div>

          {/* Carte Formulaire "Mes informations" */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
            <h3 className="text-sm font-bold text-gray-900 mb-5">Mes informations</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prénom */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Prénom</label>
                <input 
                  type="text" 
                  defaultValue="Camille" 
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
              </div>

              {/* Nom */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Nom</label>
                <input 
                  type="text" 
                  placeholder="[Nom]" 
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Email</label>
                <input 
                  type="email" 
                  defaultValue="camille@(domaine).fr" 
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
              </div>

              {/* Domaine d'étude */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Domaine d'étude</label>
                <input 
                  type="text" 
                  defaultValue="Informatique" 
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Niveau</label>
                <input 
                  type="text" 
                  defaultValue="BUT 2" 
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
              </div>

              {/* Etablissement */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Etablissement</label>
                <input 
                  type="text" 
                  defaultValue="IUT de Nevers" 
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center justify-between mt-8">
              <button className="bg-[#EEAD2D] hover:bg-[#d99b24] text-white font-medium text-xs px-6 py-2.5 rounded-xl transition-colors shadow-xs">
                Enregistrer
              </button>

              <button className="bg-[#FDF2F2] hover:bg-red-100 text-[#E54D4D] font-medium text-xs px-4 py-2.5 rounded-xl transition-colors">
                Supprimer mon compte
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}