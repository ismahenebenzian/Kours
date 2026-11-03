interface props{
    setIsLogin: (isLogin: boolean) => void;
}
export default function Login  ({setIsLogin}:props) {
    return (
        <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Content de te revoir</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Connecte-toi pour retrouver tes cours et tes favoris.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      placeholder="Entrez votre adresse e-mail ou nom d'utilisateur"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Mot de passe
                      </label>
                      <a href="#forgot" className="text-xs text-indigo-600 hover:underline">
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    Se connecter
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 mt-6">
                  Pas encore de compte ?{' '}
                  <button onClick={() => setIsLogin(false)} className="text-indigo-600 font-semibold hover:underline">
                    Créer un compte
                  </button>
                </p>
              </div>
    );
}