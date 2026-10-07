import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }: { children: ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const PORTFOLIO_URL = "/portfolio.pdf";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Chi sono', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contatti', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0C241A] text-[#FAF6ED] font-sans relative selection:bg-[#ffbe10] selection:text-[#0C241A]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0C241A]/90 backdrop-blur-md text-[#FAF6ED] border-b border-[#FAF6ED]/10 shadow-lg shadow-black/20' 
            : 'bg-transparent text-[#FAF6ED]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl tracking-tight z-50 text-[#ffbe10] hover:opacity-90 transition-opacity">
            NS.
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.15em] text-[#FAF6ED]/80 hover:text-[#e3b0ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden z-50 text-[#FAF6ED]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu: fuori dall'header, perché backdrop-blur creerebbe un containing block per gli elementi fixed */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0C241A] text-[#FAF6ED] z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base uppercase tracking-[0.15em] text-[#FAF6ED] hover:text-[#e3b0ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0C241A] text-[#FAF6ED]">
          {/* Hero Image (Right side) */}
          <div className="absolute inset-0 md:left-1/3 lg:left-[40%] flex items-center justify-center z-0">
            <img 
              src="/hero-image.jpg" 
              alt="Nicoletta Sorge" 
              className="absolute inset-0 w-full h-full object-cover object-center md:object-left z-0"
            />
            {/* Gradient to blend the image into the background on the left */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0C241A] via-[#0C241A]/85 to-transparent md:via-[#0C241A]/30 z-10" />
            <div className="absolute inset-0 bg-[#0C241A]/10 z-10" />
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pt-20 md:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-9 lg:col-span-7 relative">
                
                {/* Titoli in #ffbe10 */}
                <h1 className="text-[#ffbe10] leading-[0.9] tracking-tight mb-6 flex flex-col gap-1 md:gap-2">
                  <FadeUp delay={0.3}>
                    <span className="font-sans font-bold uppercase text-[10vw] md:text-[8vw] lg:text-[7vw] tracking-tighter block">
                      Nicoletta
                    </span>
                  </FadeUp>
                  <FadeUp delay={0.4}>
                    <span className="font-serif italic text-[12vw] md:text-[9.5vw] lg:text-[8.5vw] block pr-8">
                      Sorge
                    </span>
                  </FadeUp>
                </h1>

                <FadeUp delay={0.45}>
                  <p className="font-sans font-semibold text-[#ffbe10] uppercase tracking-[0.18em] text-[11px] md:text-[13px] mb-3">
                    Senior Copywriter | Content Strategist
                  </p>
                </FadeUp>

                <FadeUp delay={0.5}>
                  {/* Sottotitoli in #e3b0ff */}
                  <p className="font-serif italic text-[#e3b0ff] text-xl md:text-2xl max-w-[50ch] mb-6 leading-snug">
                    Penso dunque scrivo, scrollo dunque sono.
                  </p>
                  {/* Corpo testo in #FAF6ED */}
                  <p className="max-w-[55ch] mb-12 font-sans font-light text-[#FAF6ED]/90 text-sm md:text-base leading-relaxed">
                    Copywriter e content strategist da dieci anni.<br />Settori diversi, progetti diversi, formati diversi: ho fatto un po’ di tutto,<br />con il multitasking come unico vero mantra.
                  </p>
                </FadeUp>

                <FadeUp delay={0.6} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a
                    href="#contact"
                    className="inline-block border border-[#ffbe10] text-[#ffbe10] px-8 py-4 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#ffbe10] hover:text-[#0C241A] transition-colors"
                  >
                    Parliamoci
                  </a>
                  <a
                    href={PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#FAF6ED] border-b border-[#FAF6ED]/30 hover:border-[#e3b0ff] hover:text-[#e3b0ff] pb-1 transition-colors"
                  >
                    Guarda il portfolio →
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>

          {/* Vertical Text */}
          <div className="absolute bottom-12 right-6 hidden md:block origin-bottom-right -rotate-90 text-[10px] uppercase tracking-[0.15em] text-[#FAF6ED]/40">
            Milano · Copywriter · Content Strategist
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 border-t border-[#FAF6ED]/10 overflow-hidden bg-[#0C241A]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 md:order-1">
                <FadeUp>
                  {/* Titoli in #ffbe10 */}
                  <h2 className="font-serif text-[#ffbe10] text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12">
                    Una copywriter con un'anima strategica. O viceversa, dipende dal progetto.
                  </h2>
                </FadeUp>
                
                {/* Corpo testo in #FAF6ED */}
                <div className="space-y-6 font-light text-base leading-relaxed mb-12 text-[#FAF6ED]/90">
                  <FadeUp delay={0.1}>
                    <p>
                      Entro nei progetti come se fossero miei, il che può sembrare invadente, ma funziona. Mi immergo nel settore, nel tono, nelle persone a cui il brand parla. È quello che mi permette di lavorare su mondi molto diversi (tech, moda, food, wellness, FMCG) senza perdere né la voce né il punto di vista.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <p>
                      Faccio copywriting, content strategy, script, piani editoriali. Ma la parte che preferisco è quella in cui qualcuno dice “non si può fare”, perché di solito si può, basta trovare la strada giusta.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.3}>
                    <p className="font-medium text-[#FAF6ED]">
                      E trovare la strada giusta è esattamente quello che faccio.
                    </p>
                  </FadeUp>
                </div>
              </div>

              {/* Portrait Image */}
              <FadeUp delay={0.2} className="order-1 md:order-2 relative h-[60vh] md:h-[80vh] w-full md:w-[120%] overflow-hidden rounded-sm">
                <img 
                  src="/about-image.jpg"
                  alt="Ritratto Nicoletta Sorge" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#FAF6ED]/10 pointer-events-none" />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Clients + Portfolio Section */}
        <section id="portfolio" className="py-32 border-t border-[#FAF6ED]/10 bg-[#0C241A]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              {/* Sottotitolo in #e3b0ff */}
              <h2 className="text-[10px] uppercase tracking-[0.15em] text-[#e3b0ff] mb-12 font-medium">
                Portfolio & Clienti
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-24">
                {/* Titolo in #ffbe10 */}
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight max-w-[20ch] text-[#ffbe10]">
                  Campagne, social, naming, stand, script. Cose che hanno funzionato.<br />Alcune meglio del previsto, nessuna peggio.
                </p>
                <a
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#ffbe10] text-[#ffbe10] px-8 py-4 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#ffbe10] hover:text-[#0C241A] transition-colors whitespace-nowrap"
                >
                  Vedi il portfolio completo →
                </a>
              </div>
            </FadeUp>

            {/* Brand Cloud */}
            <div className="relative min-h-[40vh] mb-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-12">
              <FadeUp delay={0.2}><span className="font-serif text-4xl md:text-6xl text-[#FAF6ED]/90 hover:text-[#ffbe10] transition-colors cursor-default">Amazon</span></FadeUp>
              <FadeUp delay={0.25}><span className="font-serif text-3xl md:text-5xl text-[#e3b0ff] italic hover:text-[#ffbe10] transition-colors cursor-default">Samsung</span></FadeUp>
              <FadeUp delay={0.3}><span className="font-serif text-5xl md:text-7xl text-[#ffbe10] hover:text-[#e3b0ff] transition-colors cursor-default">Audible</span></FadeUp>
              <FadeUp delay={0.35}><span className="font-serif text-4xl md:text-6xl text-[#FAF6ED] hover:text-[#ffbe10] transition-colors cursor-default">FCA</span></FadeUp>
              <FadeUp delay={0.4}><span className="font-serif text-4xl md:text-6xl text-[#FAF6ED]/80 hover:text-[#ffbe10] transition-colors cursor-default">Ferrarelle</span></FadeUp>
              <FadeUp delay={0.45}><span className="font-serif text-3xl md:text-5xl text-[#e3b0ff] hover:text-[#ffbe10] transition-colors cursor-default">NIVEA</span></FadeUp>
              <FadeUp delay={0.5}><span className="font-serif text-5xl md:text-7xl text-[#ffbe10] italic hover:text-[#e3b0ff] transition-colors cursor-default">OVS Group</span></FadeUp>
              <FadeUp delay={0.55}><span className="font-serif text-3xl md:text-5xl text-[#FAF6ED]/90 italic hover:text-[#ffbe10] transition-colors cursor-default">Youhealthy</span></FadeUp>
              <FadeUp delay={0.6}><span className="font-serif text-4xl md:text-6xl text-[#FAF6ED]/90 hover:text-[#ffbe10] transition-colors cursor-default">STAR</span></FadeUp>
              <FadeUp delay={0.65}><span className="font-serif text-3xl md:text-5xl text-[#e3b0ff] italic hover:text-[#ffbe10] transition-colors cursor-default">Saikebon</span></FadeUp>
              <FadeUp delay={0.7}><span className="font-serif text-4xl md:text-6xl text-[#ffbe10] hover:text-[#e3b0ff] transition-colors cursor-default">Ploom</span></FadeUp>
              <FadeUp delay={0.75}><span className="font-serif text-3xl md:text-5xl text-[#e3b0ff] hover:text-[#ffbe10] transition-colors cursor-default">Dispensa Emilia</span></FadeUp>
            </div>

            <FadeUp delay={1.2} className="text-center">
              {/* Sottotitolo categorie in #e3b0ff */}
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#e3b0ff]/80 leading-relaxed max-w-4xl mx-auto font-light">
                TECH & CONSUMER ELECTRONICS · FOOD & BEVERAGE · BEAUTY & PERSONAL CARE · FASHION & LIFESTYLE · HOME & LIVING · AUDIO & ENTERTAINMENT
              </p>
            </FadeUp>
          </div>
        </section>

        {/* New Make Section */}
        <section id="new-make" className="py-32 border-t border-[#FAF6ED]/10 bg-[#0C241A] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Photo on the Left */}
              <div className="md:col-span-5 lg:col-span-5 order-2 md:order-1">
                <FadeUp delay={0.1} className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden rounded-sm ring-1 ring-inset ring-[#FAF6ED]/10">
                  <img 
                    src="/newmake-image.jpg"
                    alt="New Make Studio" 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#0C241A]/10 pointer-events-none" />
                </FadeUp>
              </div>

              {/* Text on the Right */}
              <div className="md:col-span-7 lg:col-span-7 order-1 md:order-2">
                <FadeUp>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#e3b0ff] font-medium block mb-4">
                    Studio Creativo
                  </span>
                  <h2 className="font-serif text-[#ffbe10] text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-8">
                    New Make: quando una coppia creativa crea uno spazio<br />tutto per sé
                  </h2>
                </FadeUp>

                <FadeUp delay={0.15}>
                  <div className="space-y-4 font-light text-base md:text-lg leading-relaxed text-[#FAF6ED]/90 mb-10 max-w-[55ch]">
                    <p>
                      Nel 2023 ho co-fondato New Make, studio creativo di comunicazione e direzione creativa, con un occhio alle possibilità dell'AI applicata al video.
                    </p>
                    <p className="font-serif italic text-lg md:text-xl text-[#FAF6ED]">
                      Creative work, done properly. Or at least that’s the plan.
                    </p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <a
                    href="https://www.newmakestudio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#ffbe10] text-[#ffbe10] px-8 py-4 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#ffbe10] hover:text-[#0C241A] transition-colors"
                  >
                    Scopri New Make
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Project Teaser Section */}
        <section className="py-20 md:py-24 bg-[#0C241A] text-[#FAF6ED] relative overflow-hidden border-t border-[#FAF6ED]/10">
          {/* Subtle ambient glow */}
          <div className="absolute inset-0 bg-radial from-[#133829] via-transparent to-transparent opacity-60 pointer-events-none" />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#e3b0ff] mb-6 tracking-tight">
                MindfulMess – TBD
              </h2>
            </FadeUp>
            
            <div className="relative inline-block">
              <FadeUp delay={0.1}>
                {/* Testo giallo senza virgolette */}
                <p className="font-serif italic text-[#ffbe10] text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 max-w-3xl mx-auto">
                  C'è un progetto in cantiere. Unisce due cose che non ti aspetti insieme: la meditazione e la scrittura.
                </p>
              </FadeUp>
              
              <motion.div 
                initial={{ opacity: 0, rotate: 5 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-6 -right-2 md:-right-8 font-hand text-[#e3b0ff] text-xl md:text-2xl"
              >
                (ti avviso io)
              </motion.div>
            </div>

            <FadeUp delay={0.2}>
              {/* Corpo testo in #FAF6ED con a capo dopo separate. */}
              <p className="font-light text-sm md:text-base text-[#FAF6ED]/90 max-w-2xl mx-auto mt-6 leading-relaxed">
                È per le aziende che credono che stare bene e lavorare bene non siano cose separate.<br />Per ora è un seme. Torna presto.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 border-t border-[#FAF6ED]/10 bg-[#0C241A]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              {/* Sottotitolo tag in #e3b0ff */}
              <h2 className="text-[10px] uppercase tracking-[0.15em] text-[#e3b0ff] mb-16 font-medium">
                Parliamoci
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              <FadeUp delay={0.1}>
                {/* Titolo in #ffbe10 */}
                <h3 className="font-serif text-[#ffbe10] text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8">
                  Hai un brief.<br />Io ho le domande giuste.
                </h3>
                {/* Corpo testo in #FAF6ED */}
                <p className="font-light text-lg max-w-[40ch] text-[#FAF6ED]/90">
                  Se hai un progetto (o anche solo un’idea) questa è la parte in cui mi scrivi.
                </p>
              </FadeUp>

              <div className="flex flex-col justify-center">
                <FadeUp delay={0.2} className="border-b border-[#FAF6ED]/10">
                  <a href="mailto:hello@nicolettasorge.com" className="group flex justify-between items-center py-6 hover:pl-4 transition-all duration-300">
                    <span className="font-serif text-2xl text-[#FAF6ED] group-hover:text-[#ffbe10] transition-colors">Mail</span>
                    <span className="font-sans font-light text-sm text-[#e3b0ff] group-hover:text-[#FAF6ED] transition-colors">hello@nicolettasorge.com</span>
                  </a>
                </FadeUp>
                <FadeUp delay={0.3} className="border-b border-[#FAF6ED]/10">
                  <a href="https://www.linkedin.com/in/nicoletta-sorge" target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center py-6 hover:pl-4 transition-all duration-300">
                    <span className="font-serif text-2xl text-[#FAF6ED] group-hover:text-[#ffbe10] transition-colors">LinkedIn</span>
                    <span className="font-sans font-light text-sm text-[#e3b0ff] group-hover:text-[#FAF6ED] transition-colors">→ Vai al profilo</span>
                  </a>
                </FadeUp>
                <FadeUp delay={0.4} className="border-b border-[#FAF6ED]/10">
                  <a href="https://www.behance.net/nicolettas589f" target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center py-6 hover:pl-4 transition-all duration-300">
                    <span className="font-serif text-2xl text-[#FAF6ED] group-hover:text-[#ffbe10] transition-colors">Behance</span>
                    <span className="font-sans font-light text-sm text-[#e3b0ff] group-hover:text-[#FAF6ED] transition-colors">→ Scopri alcuni progetti</span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#FAF6ED]/10 py-8 bg-[#0C241A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.15em] text-[#FAF6ED]/60">
            Nicoletta Sorge — Milano, {new Date().getFullYear()}
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.15em] text-[#FAF6ED]/60">
            <a href="https://www.linkedin.com/in/nicoletta-sorge" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3b0ff] transition-colors">LinkedIn</a>
            <a href="https://www.behance.net/nicolettas589f" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3b0ff] transition-colors">Behance</a>
            <a href="mailto:hello@nicolettasorge.com" className="hover:text-[#e3b0ff] transition-colors">Mail</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
