import Navbar from '../components/navbar';
import HeroSection from '../components/Home/heroSection';

export default function Home() {
    return (
        <main>
            {/* Section avec background bleu */}
            <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#0B1440] via-[#1B2E8F] to-[#2F5BEA]">

                {/* Motif de points */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, #5275FF 1.2px, transparent 1.2px)',
                        backgroundSize: '18px 18px',
                    }}
                />

                {/* Navbar */}
                <Navbar />

                {/* Contenu de la page */}
                    <HeroSection />
            </section>
        </main>
    );
}