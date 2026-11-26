//import { Weight } from "lucide-react";

export default function CommentCaMarche() {
  const [data, setData] = useState<HowItWorksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    let active = true;

    fetchHowItWorks()
      .then((res) => {
        if (active) {
          setData(res);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (active) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <main className="how-it-works">Chargement...</main>;
  }

  if (error || !data) {
    return (
      <main className="how-it-works">
        <p role="alert">{error || 'Contenu indisponible'}</p>
      </main>
    );
  }

  return (
    <main className="how-it-works">
      <header className="how-it-works__hero">
        <span className="how-it-works__badge">{data.hero.badge}</span>
        <h1>{data.hero.title}</h1>
        <p>{data.hero.subtitle}</p>
      </header>

      <section className="how-it-works__steps" aria-label="Étapes d'utilisation">
        {data.steps.map((step) => (
          <article key={step.stepNumber} className="step-card">
            <span className="step-card__number">Étape {step.stepNumber}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
            <a href={step.ctaTarget} className="step-card__cta">
              {step.ctaLabel}
            </a>
          </article>
        ))}
      </section>

      <section className="how-it-works__highlights" aria-label="Points clés">
        {data.highlights.map((item) => (
          <article key={item.id} className="highlight-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="how-it-works__faq" aria-label="Questions fréquentes">
        <h2>Questions fréquentes</h2>
        {data.faq.map((item, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <div key={item.question} className="faq-item">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              >
                {item.question}
              </button>
              {isOpen && <p>{item.answer}</p>}
            </div>
          );
        })}
      </section>
    </main>
  );
}