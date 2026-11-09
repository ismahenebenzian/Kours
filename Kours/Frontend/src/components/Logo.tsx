import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Logo() {
    return (
        <Link to="/" className="flex items-start gap-3">
            {/* Logo */}
            <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 rounded-lg"
            />

            {/* Titre et slogan */}
            <div className="flex flex-col items-start">
                <p className="text-white text-xl font-bold leading-tight">
                    Kours
                </p>
                <p className="text-xs text-slate-400">
                    Partager · Apprendre · Réussir
                </p>
            </div>
        </Link>
    );
}