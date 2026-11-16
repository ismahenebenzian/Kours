import { useEffect, useState } from 'react';
import type { PopUpProps } from "./Types";

export default function PopUp({ IsOpen, children }: PopUpProps) {
    const [isVisible, setIsVisible] = useState(IsOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (IsOpen) {
            setIsVisible(true);

            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        } else {

            setIsAnimating(false);
            const timer = setTimeout(() => setIsVisible(false), 200); 
            return () => clearTimeout(timer);
        }
    }, [IsOpen]);

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 transition-opacity duration-200 ease-out ${
                isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div 
                className={`bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl relative transition-all duration-200 ease-out ${
                    isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                }`}
            >
                {children}
            </div>
        </div>
    );
}