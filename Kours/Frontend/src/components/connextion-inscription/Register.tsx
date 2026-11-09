interface RegisterProps {
    setIsLogin: (isLogin: boolean) => void;
}
export default function Register({ setIsLogin }: RegisterProps) {
    return (
        <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Prêt à booster vos compétences ?</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Inscris-toi pour retrouver tes cours et tes favoris.</p>
                </div>

                <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nom de famille
                      </label>
                      <input
                        type="text"
                        placeholder="Entrez votre nom de famille"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        placeholder="Entrez votre prénom"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    S'enregistrer gratuitement
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 mt-5">
                  Tu as déjà un compte ?{' '}
                  <button onClick={() => setIsLogin(true)} className="text-indigo-600 font-semibold hover:underline">
                    Connecte-toi ici
                  </button>
                </p>
              </div>
    );
}   