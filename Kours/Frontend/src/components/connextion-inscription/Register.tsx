import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../SupabaseClient'; // Ajuste le chemin selon ton dossier

interface RegisterProps {
    setIsLogin: (isLogin: boolean) => void;
}

export default function Register({ setIsLogin }: RegisterProps) {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        nom,
                        prenom,
                    }
                }
            });

            if (error) throw error;

            setMessage({ text: "Compte créé avec succès ! Tu peux te connecter.", type: 'success' });

            setTimeout(() => {
                setIsLogin(true);
            }, 1500);

        } catch (error: any) {
            setMessage({ text: error.message || "Erreur lors de l'inscription.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Prêt à booster vos compétences ?</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Inscris-toi pour retrouver tes cours et tes favoris.</p>
            </div>

            {message && (
                <div className={`flex items-center gap-2 p-3 mb-4 rounded-xl text-xs font-bold ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{message.text}</span>
                </div>
            )}

            <form className="space-y-3.5" onSubmit={handleRegister}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nom de famille
                        </label>
                        <input
                            type="text"
                            required
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Entrez votre nom"
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            required
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
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
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Inscription..." : "S'enregistrer gratuitement"}
                </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
                Tu as déjà un compte ?{' '}
                <button onClick={() => setIsLogin(true)} className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                    Connecte-toi ici
                </button>
            </p>
        </div>
    );
}