import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../SupabaseClient';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            setMessage({ text: "Connexion réussie ! Redirection...", type: 'success' });

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

        } catch (error: any) {
            setMessage({ text: error.message || "Identifiants incorrects.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Content de te revoir</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Connecte-toi pour retrouver tes cours et tes favoris.</p>
            </div>

            {message && (
                <div className={`flex items-center gap-2 p-3 mb-4 rounded-xl text-xs font-bold ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{message.text}</span>
                </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Adresse e-mail
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre adresse e-mail"
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
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-6">
                Pas encore de compte ?{' '}
                <button onClick={() => navigate('/register')} className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                    Créer un compte
                </button>
            </p>
        </div>
    );
}