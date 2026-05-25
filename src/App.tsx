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

  const navLinks = [
    { name: 'Chi sono', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contatti', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-cream text-brown font-sans relative selection:bg-coral selection:text-cream">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          isScrolled ? 'bg-cream/90 backdrop-blur-sm text-brown' : 'bg-transparent text-cream'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl tracking-tight z-50">
            Nicoletta Sorge
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  isScrolled ? 'hover:text-coral' : 'hover:text-yellow'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} className={isScrolled ? 'text-brown' : 'text-cream'} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-cream text-brown z-40 flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.15em] hover:text-coral transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#3b5a40] text-cream">
          {/* Hero Image (Right side) */}
          <div className="absolute inset-0 md:left-1/3 lg:left-[40%] flex items-center justify-center z-0">
            <img 
              src="src/pic_hero.jpeg" 
              alt="Nicoletta Sorge" 
              className="absolute inset-0 w-full h-full object-cover object-center md:object-left z-0"
            />
            {/* Gradient to blend the image into the background on the left */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#3b5a40] via-[#3b5a40]/80 to-transparent md:via-[#3b5a40]/20 z-10"></div>
            <div className="absolute inset-0 bg-black/10 z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pt-20 md:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-9 lg:col-span-7 relative">
                
                <h1 className="text-yellow leading-[0.9] tracking-tight mb-8 flex flex-col gap-1 md:gap-2">
                  <FadeUp delay={0.3}>
                    <span className="font-sans font-bold uppercase text-[14vw] md:text-[11vw] lg:text-[10vw] tracking-tighter block">
                      Nicoletta
                    </span>
                  </FadeUp>
                  <FadeUp delay={0.4}>
                    <span className="font-serif italic text-[16vw] md:text-[13vw] lg:text-[12vw] block pr-8">
                      Sorge
                    </span>
                  </FadeUp>
                </h1>

                <FadeUp delay={0.5}>
                  <p className="font-sans font-medium text-yellow/90 max-w-[50ch] mb-6 leading-relaxed uppercase tracking-[0.1em] text-[10px] md:text-[12px]">
                    Il mio lavoro finisce raramente dove inizia.<br />Di solito è lì che diventa interessante.
                  </p>
                  <p className="font-sans font-light text-cream/90 max-w-[55ch] mb-12 leading-relaxed text-sm md:text-base">
                    Scrivo copy, costruisco strategie, sviluppo contenuti su più canali. Lo faccio velocemente, con uno sguardo che non si ferma alla headline e senza trasformare ogni brief in una crisi esistenziale.
                  </p>
                </FadeUp>

                <FadeUp delay={0.6} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a
                    href="#contact"
                    className="inline-block border border-yellow text-yellow px-8 py-4 text-[11px] uppercase tracking-[0.15em] hover:bg-yellow hover:text-[#3b5a40] transition-colors"
                  >
                    Parliamoci
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1-4wHjOJ_pnSzG-0_1QwtN-AqqIZtJnmU/view?usp=sharing"
                    className="inline-block text-[11px] uppercase tracking-[0.15em] border-b border-cream/30 hover:border-yellow hover:text-yellow pb-1 transition-colors"
                  >
                    Guarda il portfolio →
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>

          {/* Vertical Text */}
          <div className="absolute bottom-12 right-6 hidden md:block origin-bottom-right -rotate-90 text-[10px] uppercase tracking-[0.15em] text-cream/60">
            Milano · Copywriter · Content Strategist
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 border-t border-brown/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 md:order-1">
                <FadeUp>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12">
                    Una copywriter con un'anima strategica. O viceversa, dipende dal progetto.
                  </h2>
                </FadeUp>
                
                <div className="space-y-6 font-light text-base leading-relaxed mb-12">
                  <FadeUp delay={0.1}>
                    <p>
                      Entro nei progetti come se fossero miei, il che può sembrare invadente, ma funziona. Mi immergo nel settore, nel tono, nelle persone a cui il brand parla. È quello che mi permette di lavorare su mondi molto diversi (tech, moda, food, wellness, FMCG) senza perdere né la voce né il punto di vista.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <p>
                      Faccio copywriting, content strategy, script, piani editoriali. Ma la parte che preferisco è quella in cui qualcuno dice "non si può fare”, perché di solito si può, basta trovare la strada giusta.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.3}>
                    <p className="font-medium">
                      E trovare la strada giusta è esattamente quello che faccio.
                    </p>
                  </FadeUp>
                </div>
              </div>

              {/* Portrait Image */}
              <FadeUp delay={0.2} className="order-1 md:order-2 relative h-[60vh] md:h-[80vh] w-full md:w-[120%]">
                <img 
                  src="src/pic_profile.jpeg" 
                  alt="Ritratto Nicoletta Sorge" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Clients + Portfolio Section */}
        <section id="portfolio" className="py-32 border-t border-brown/10">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-[10px] uppercase tracking-[0.15em] text-brown/60 mb-12">Portfolio & Clienti</h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-24">
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight max-w-[20ch] text-brown">
                  Campagne, social, naming, stand, script. Cose che hanno funzionato.<br />Alcune meglio del previsto, nessuna peggio.
                </p>
                <a
                  href="https://drive.google.com/file/d/1-4wHjOJ_pnSzG-0_1QwtN-AqqIZtJnmU/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-brown text-brown px-8 py-4 text-[11px] uppercase tracking-[0.15em] hover:bg-brown hover:text-cream transition-colors whitespace-nowrap"
                >
                  Vedi il portfolio completo →
                </a>
              </div>
            </FadeUp>

            <div className="relative min-h-[40vh] mb-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-12">
              <FadeUp delay={0.2}><span className="font-serif text-4xl md:text-6xl text-brown/90">Amazon</span></FadeUp>
              <FadeUp delay={0.3}><span className="font-serif text-3xl md:text-5xl text-coral/80 italic">Samsung</span></FadeUp>
              <FadeUp delay={0.4}><span className="font-serif text-5xl md:text-7xl text-brown">Audible</span></FadeUp>
              <FadeUp delay={0.5}><span className="font-serif text-4xl md:text-6xl text-ochre/90">Ferrarelle</span></FadeUp>
              <FadeUp delay={0.6}><span className="font-serif text-3xl md:text-5xl text-brown/80">NIVEA</span></FadeUp>
              <FadeUp delay={0.7}><span className="font-serif text-5xl md:text-7xl text-coral italic">OVS Group</span></FadeUp>
              <FadeUp delay={0.8}><span className="font-serif text-4xl md:text-6xl text-brown/90">STAR</span></FadeUp>
              <FadeUp delay={0.9}><span className="font-serif text-3xl md:text-5xl text-ochre/80 italic">Saikebon</span></FadeUp>
              <FadeUp delay={1.0}><span className="font-serif text-4xl md:text-6xl text-brown">Hoover</span></FadeUp>
              <FadeUp delay={1.1}><span className="font-serif text-3xl md:text-5xl text-coral/90">Dispensa Emilia</span></FadeUp>
            </div>

            <FadeUp delay={1.2} className="text-center">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-brown/50 leading-relaxed max-w-4xl mx-auto">
                TECH & CONSUMER ELECTRONICS · FOOD & BEVERAGE · BEAUTY & PERSONAL CARE · FASHION & LIFESTYLE · HOME & LIVING · AUDIO & ENTERTAINMENT
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Project Teaser Section */}
        <section className="py-40 bg-dark-olive text-cream relative overflow-hidden">
        
  
          {/* Noise overlay for dark section */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-yellow mb-12">In cantiere</span>
            </FadeUp>
            
            <div className="relative inline-block">
              <FadeUp delay={0.1}>
                <h2 className="font-serif italic text-yellow text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 max-w-3xl mx-auto">
                  "C'è un progetto in cantiere. Unisce due cose che non ti aspetti insieme: la meditazione e la scrittura."
                </h2>
              </FadeUp>
              
              <motion.div 
                initial={{ opacity: 0, rotate: 5 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-8 -right-4 md:-right-12 font-hand text-cream/60 text-xl md:text-2xl"
              >
                (ti avviso io)
              </motion.div>
            </div>

            <FadeUp delay={0.2}>
              <p className="font-light text-sm md:text-base text-yellow/80 max-w-2xl mx-auto mt-8">
                È per le aziende che credono che stare bene e lavorare bene non siano cose separate. Per ora è un seme. Torna presto.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-[10px] uppercase tracking-[0.15em] text-brown/60 mb-16">Parliamoci</h2>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              <FadeUp delay={0.1}>
                <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8">
                  Hai un brief.<br />Io ho le domande giuste.
                </h3>
                <p className="font-light text-lg max-w-[40ch]">
                  Se hai un progetto (o anche solo un’idea) questa è la parte in cui mi scrivi.
                </p>
              </FadeUp>

              <div className="flex flex-col justify-center">
                <FadeUp delay={0.2} className="border-b border-brown/10">
                  <a href="mailto:hello.nicolettasorge@gmail.com" className="group flex justify-between items-center py-6 hover:pl-4 transition-all duration-300">
                    <span className="font-serif text-2xl group-hover:text-coral transition-colors">Mail</span>
                    <span className="font-sans font-light text-sm">hello.nicolettasorge@gmail.com</span>
                  </a>
                </FadeUp>
                <FadeUp delay={0.3} className="border-b border-brown/10">
                  <a href="https://www.instagram.com/nicoletta_sorge/" target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center py-6 hover:pl-4 transition-all duration-300">
                    <span className="font-serif text-2xl group-hover:text-coral transition-colors">Instagram</span>
                    <span className="font-sans font-light text-sm">→ @nicoletta_sorge</span>
                  </a>
                </FadeUp>
                <FadeUp delay={0.4} className="border-b border-brown/10">
                  <a href="https://www.behance.net/nicolettas589f" target="_blank" rel="noopener noreferrer" className="group flex justify-between items-center py-6 hover:pl-4 transition-all duration-300">
                    <span className="font-serif text-2xl group-hover:text-coral transition-colors">Behance</span>
                    <span className="font-sans font-light text-sm">→ link</span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brown/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.15em] text-brown/60">
            Nicoletta Sorge — Milano, 2025
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.15em] text-brown/60">
            <a href="#" className="hover:text-brown transition-colors">Privacy</a>
            <a href="#" className="hover:text-brown transition-colors">Instagram</a>
            <a href="#" className="hover:text-brown transition-colors">Behance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
