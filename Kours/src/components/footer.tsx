export default function Footer()
{
    return (
    <>
    {/* PIED DE PAGE (FOOTER) */}
      <footer className="w-full bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 text-slate-600">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Colonne Logo / Description */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Kours</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              La plateforme gratuite et collaborative de partage de cours entre étudiants.
            </p>
          </div>

          {/* Colonne Découvrir */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Découvrir
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#parcourir" className="hover:text-slate-900 transition-colors">
                  Parcourir les cours
                </a>
              </li>
              <li>
                <a href="#compte" className="hover:text-slate-900 transition-colors">
                  Créer un compte
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne Légal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Légal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#droit-auteur" className="hover:text-slate-900 transition-colors">
                  Droit d'auteur
                </a>
              </li>
              <li>
                <a href="#signaler" className="hover:text-slate-900 transition-colors">
                  Signaler un contenu
                </a>
              </li>
            </ul>
          </div>

        </div>
      </footer>

    </>
    )
}