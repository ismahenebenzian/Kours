import Navbar from '../components/navbar';
import HeroSection from '../components/Home/heroSection';
import Trouver from'../assets/trouvercours.svg';
import Notes from'../assets/notesImages.svg';
import comments from '../assets/home/commentairesIMG.svg'
import Footer from '../components/footer'


export default function Home() {
    const steps = [
        {
            number: '01',
            numberColor: 'text-blue-600',
            title: 'Crée ton compte',
            description: 'Indique ton domaine et ton niveau. Ça prend une minute.',
        },
        {
            number: '02',
            numberColor: 'text-amber-500',
            title: 'Trouve ou dépose',
            description: 'Recherche un cours, ou partage les tiens en PDF.',
        },
        {
            number: '03',
            numberColor: 'text-emerald-600',
            title: 'Révise et échange',
            description: 'Quiz, notes, commentaires et avis de la communauté.',
        },
    ];
    return (
        <main className='min-h-screen z-9'>
            {/* Navbar */}
                <Navbar />
            {/* Section avec background bleu */}
            <section className="relative  h-full bg-gradient-to-r from-[#0B1440] via-[#1B2E8F] to-[#2F5BEA]">

                {/* Motif de points */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, #5275FF 1.2px, transparent 1.2px)',
                        backgroundSize: '18px 18px',
                    }}
                />

                

                {/* Contenu de la page */}
                <HeroSection />
            </section>



            <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
                {/* En-tête principal */}
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                        TOUT-EN-UN
                    </span>
                    <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        Cours, quiz et notes : tout ce qu’il te faut pour réussir, au même endroit.
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                        Une seule appli, gratuite, pensée pour la façon dont les étudiants révisent vraiment.
                    </p>
                </div>

                =                <div className="w-full h-[1px]  my-16" />

                {/* Section 3 étapes */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
                        Prêt en 3 étapes
                    </h2>

                    {/* Cartes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="bg-slate-50/70 border border-slate-100 rounded-2xl p-8 flex flex-col justify-between transition-shadow hover:shadow-sm"
                            >
                                <div>
                                    <span className={`text-3xl sm:text-4xl font-extrabold ${step.numberColor}`}>
                                        {step.number}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="w-full bg-white flex flex-col">

                {/* SECTION 1 : Les cours de ta filière, à portée de clic */}
                <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#E6F1FF]">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-30 items-center">

                        {/* Texte à gauche */}
                        <div className="flex flex-col items-start">
                            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3">
                                TROUVER
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                                Les cours de ta filière, à portée de clic.
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                                Recherche par mot-clé, matière, niveau ou établissement, et compare avec les cours d'autres campus.
                            </p>

                            {/* Liste de points */}
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center text-slate-700 text-sm sm:text-base font-medium">
                                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
                                    Filtres par domaine, niveau et université
                                </li>
                                <li className="flex items-center text-slate-700 text-sm sm:text-base font-medium">
                                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
                                    Notes et avis des étudiants
                                </li>
                            </ul>

                            {/* Lien En savoir plus */}
                            <a
                                href="#en-savoir-plus"
                                className="mt-8 inline-flex items-center text-slate-900 font-semibold hover:text-indigo-600 transition-colors group"
                            >
                                En savoir plus
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                        {/* Illustration / Image à droite */}
                        <div className="relative w-full flex justify-center">
                            <div className="w-full max-w-lg bg-indigo-100/60 rounded-3xl p-6 sm:p-8 shadow-sm">
                                {/* Remplacez src par le chemin de votre image de recherche */}
                                <img
                                    src={Trouver}
                                    alt="Interface de recherche de cours"
                                    className="w-full h-auto rounded-2xl shadow-md object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* SECTION 2 : Prends tes notes sans quitter ton cours */}
                <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Illustration / Image à gauche */}
                        <div className="relative w-full flex justify-center order-2 lg:order-1">
                            <div className="w-full max-w-lg bg-emerald-600 rounded-3xl p-6 sm:p-8 shadow-sm">
                                {/* Remplacez src par le chemin de votre image de l'éditeur */}
                                <img
                                    src={Notes}
                                    alt="Éditeur de notes en ligne"
                                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                                />
                            </div>
                        </div>

                        {/* Texte à droite */}
                        <div className="flex flex-col items-start order-1 lg:order-2">
                            <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-3">
                                L'ÉDITEUR DE NOTES
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                                Prends tes notes sans quitter ton cours.
                            </h2>
                            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                                Un éditeur en ligne, sans logiciel à installer. Ouvre le cours à côté et écris sans jamais rien perdre.
                            </p>

                            {/* Liste de points */}
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center text-slate-700 text-sm sm:text-base font-medium">
                                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
                                    Sauvegarde automatique
                                </li>
                                <li className="flex items-center text-slate-700 text-sm sm:text-base font-medium">
                                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
                                    Cours et notes côte à côte
                                </li>
                                <li className="flex items-center text-slate-700 text-sm sm:text-base font-medium">
                                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
                                    Accessible depuis ton compte
                                </li>
                            </ul>

                            {/* Badge et Lien En savoir plus */}
                            <div className="mt-6 inline-block bg-amber-100/70 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full">
                                Disponible sur ordinateur • Bientôt sur mobile
                            </div>

                            <a
                                href="#en-savoir-plus"
                                className="mt-6 inline-flex items-center text-slate-900 font-semibold hover:text-emerald-600 transition-colors group"
                            >
                                En savoir plus
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                    </div>
                </section>
  
    <section className="w-full bg-gradient-to-r from-[#0B1440] via-[#1B2E8F] to-[#2F5BEA] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
       <div>
        <img src={comments} alt="" />
       </div>

        {/* Texte à droite */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
            LA COMMUNAUTÉ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Tu bloques ? La communauté te répond.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Sous chaque cours, pose une question, annote une page ou donne ton avis. Les étudiants s'entraident.
          </p>

          {/* Liste de points avec icônes de validation dorées */}
          <ul className="mt-6 space-y-3">
            <li className="flex items-center text-slate-200 text-sm sm:text-base font-medium">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
              Commentaires et annotations sous chaque cours
            </li>
            <li className="flex items-center text-slate-200 text-sm sm:text-base font-medium">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
              Notes et avis pour repérer les meilleurs cours
            </li>
            <li className="flex items-center text-slate-200 text-sm sm:text-base font-medium">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xs mr-3 font-bold">✓</span>
              Signalement en un clic, droit d'auteur respecté
            </li>
          </ul>
        </div>

      </div>
    </section>

    <div className="w-full bg-white flex flex-col">
      
      {/* SECTION APPEL À L'ACTION (CTA) */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white flex justify-center">
        <div className="w-full max-w-5xl bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-600 rounded-3xl p-8 sm:p-14 text-center text-white shadow-xl flex flex-col items-center">
          
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Prêt à réviser autrement ?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl">
            Crée ton compte en 1 minute. Dépose un cours, aide la communauté.
          </p>

          {/* Boutons d'action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors shadow-md">
              Créer un compte
            </button>
            <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-slate-600 font-semibold px-6 py-3 rounded-xl transition-colors">
              Déposer un cours
            </button>
          </div>

        </div>
      </section>

      <Footer/>

      
    </div>



            </div>


        </main>
    );
}