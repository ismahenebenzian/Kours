import "./Accueil.css";

function Accueil() {
  return (
    <main>
      <header className="navbar">
        <h2>Kours</h2>

        <nav>
          <a href="#explorer">Explorer</a>
          <a href="#domaines">Domaines</a>
          <a href="#communaute">Communauté</a>
        </nav>

        <div>
          <button>Se connecter</button>
          <button>Créer un compte</button>
        </div>
      </header>

      <section className="hero" id="explorer">
        <h1>
          Tous les cours de
          <br />
          <span>tous les campus,</span>
          <br />
          gratuits.
        </h1>

        <p>
          Cours, fiches résumées et quiz partagés par des étudiants.
          <br />
          Trouve ce qu'il te manque et révise gratuitement.
        </p>

        <div className="search">
          <input placeholder="Matière, mot-clé, établissement..." />
          <button>Rechercher</button>
        </div>
      </section>
    </main>
  );
}

export default Accueil;