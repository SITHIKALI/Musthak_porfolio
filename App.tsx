import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hero from './components/Hero';
import SectionTitle from './components/SectionTitle';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ProjectsSection from './components/ProjectsSection';
import ChatWidget from './components/ChatWidget';
import SimpleLogo from './components/SimpleLogo';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { SKILLS, PROJECTS } from './constants';
import { Project } from './types';
import { Palette, Terminal, Cpu, Camera, Gamepad2, Clapperboard, Menu, X } from 'lucide-react';

type PageType = 'home' | 'about' | 'contact';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle route changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1).toLowerCase();
      if (hash === 'about') setCurrentPage('about');
      else if (hash === 'contact') setCurrentPage('contact');
      else setCurrentPage('home');
    };

    // Check hash on mount
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    const cleanPath = path.toLowerCase().replace(/^#/, '').trim();
    if (cleanPath === '' || cleanPath === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = cleanPath;
    }
    setCurrentPage((cleanPath === '' || cleanPath === 'home' ? 'home' : cleanPath) as PageType);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Render different pages based on currentPage
  if (currentPage === 'about') {
    return <AboutPage navigate={navigate} />;
  }

  if (currentPage === 'contact') {
    console.log('Rendering ContactPage');
    return <ContactPage navigate={navigate} />;
  }

  // Default home page
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      // floating motion for holo cards
      const cards = gsap.utils.toArray('.holo-card');
      gsap.to(cards, {
        y: -4,
        rotationX: 1.2,
        rotationY: 0.6,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.08,
      });

      // sheen entries on hover
      cards.forEach((c: any) => {
        const sheen = c.querySelector('.holo-sheen');
        if (!sheen) return;
        gsap.set(sheen, { xPercent: -120, opacity: 0 });
        const hoverTween = gsap.to(sheen, { xPercent: 120, opacity: 1, duration: 0.9, ease: 'power2.out', paused: true });
        c.addEventListener('mouseenter', () => hoverTween.play(0));
        c.addEventListener('mouseleave', () => hoverTween.reverse());
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Sticky nav: hide on scroll down, show on scroll up
  useEffect(() => {
    if (!navRef.current || typeof window === 'undefined') return;
    let lastY = window.scrollY;
    let ticking = false;
    const navEl = navRef.current;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > lastY + 10) {
          // scrolling down -> hide
          gsap.to(navEl, { y: '-110%', duration: 0.35, ease: 'power2.out' });
        } else if (currentY < lastY - 10) {
          // scrolling up -> show
          gsap.to(navEl, { y: '0%', duration: 0.35, ease: 'power2.out' });
        }
        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section observer to update active nav link based on viewport (does NOT navigate pages)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sections = ['home', 'about', 'services', 'projects', 'contact'];
    const opts: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.45 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const sectionId = (id === '' || id === null) ? 'home' : id.toString();
          if (sectionId === 'home') setActiveSection('home');
          else if (sectionId === 'about') setActiveSection('about');
          else if (sectionId === 'contact') setActiveSection('contact');
          else if (sectionId === 'projects') setActiveSection('home');
          else if (sectionId === 'services') setActiveSection('home');
        }
      });
    }, opts);

    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll listener for header styling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-200">
      
      {/* Navigation */}
      <nav
        ref={navRef}
        className={`sticky top-0 w-full z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg shadow-neon-purple/10'
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center z-50">
            <SimpleLogo />
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  if (link.name === 'About' || link.name === 'Contact') {
                    e.preventDefault();
                    navigate(link.href.slice(1));
                  }
                }}
                className="hover:text-white transition-colors"
              >
                <span className={`holo-card inline-flex items-center ${activeSection === (link.href.slice(1) || 'home') ? 'ring-1 ring-neon-purple' : ''}`}>
                  <span className="holo-text">{link.name}</span>
                  <span aria-hidden className="holo-sheen" />
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in-up md:hidden">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => {
                  if (link.name === 'About' || link.name === 'Contact') {
                    e.preventDefault();
                    navigate(link.href.slice(1));
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl font-display font-bold text-white hover:text-neon-purple transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-slate-900/50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            
            {/* Image Column */}
            <div className="w-full md:w-1/3 flex justify-center relative group">
               {/* Glow Effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple to-neon-cyan rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
               
               {/* Image Container */}
               <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800/80 group-hover:border-neon-purple/50 transition-all duration-500 shadow-2xl z-10">
                 <img 
                   src="/assets/images/profile_pic.jpeg" 
                   alt="F. Mohamad Musthak Ali" 
                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                 />
                 {/* Glass Overlay */}
                 <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full pointer-events-none"></div>
               </div>
               
               {/* Floating Badge */}
               <div className="absolute -bottom-4 right-10 md:right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2 z-20 shadow-lg animate-float">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-xs font-bold text-white">Open to Work</span>
               </div>
            </div>

            {/* Content Column */}
            <div className="w-full md:w-2/3 text-left space-y-8">
               <div>
                 <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                   The Human Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">The Logic</span>
                 </h2>
                 
                 <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                   I'm <strong className="text-white font-semibold">Musthak Ali</strong>—a UI/UX designer and automation developer passionate about building human-centered digital experiences powered by intelligent systems.
                 </p>
               </div>

               <div className="space-y-4 text-slate-400 leading-relaxed">
                 <p>
                   Currently pursuing my <strong className="text-slate-200">BSc in Computer Science</strong> (Class of 2025, CGPA: 8.2), my journey bridges the creative and the technical. 
                   My hands-on experience ranges from <strong className="text-slate-200">ATS internships</strong> where I built WordPress ecosystems, to <strong className="text-slate-200">Game Tech</strong> roles developing 2D Unity games.
                 </p>
                 <p>
                   I don't just design interfaces; I engineer workflows. Whether it's the <strong className="text-slate-200">Interview Management System</strong> prototype that reimagines HR workflows, or the <strong className="text-slate-200">HR AI Agent</strong> built with Python & Gemini to automate scheduling, my work focuses on solving real problems with aesthetic precision and algorithmic efficiency.
                 </p>
               </div>

               {/* Personal Touch & Interests */}
               <div className="bg-slate-800/30 rounded-2xl p-6 border-l-4 border-neon-purple backdrop-blur-sm">
                 <p className="italic text-slate-400 mb-4">
                   "When I'm not deep in Figma or coding automation scripts, you'll find me exploring the creative world."
                 </p>
                 <div className="flex gap-6 text-sm font-medium text-slate-300">
                   <div className="flex items-center gap-2 hover:text-neon-purple transition-colors">
                     <Camera size={18} /> Photography
                   </div>
                   <div className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
                     <Clapperboard size={18} /> Video Editing
                   </div>
                   <div className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                     <Gamepad2 size={18} /> Game Design
                   </div>
                 </div>
               </div>

               {/* Stats/Highlights Grid */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors group">
                    <div className="text-2xl font-bold text-neon-purple mb-1 group-hover:scale-110 transition-transform">8.2</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">CGPA</div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors group">
                    <div className="text-2xl font-bold text-neon-cyan mb-1 group-hover:scale-110 transition-transform">20+</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors group">
                    <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">3+</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Internships</div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800 transition-colors group">
                    <div className="text-2xl font-bold text-pink-500 mb-1 group-hover:scale-110 transition-transform">∞</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Curiosity</div>
                  </div>
               </div>

               {/* CTA Button */}
               <button
                 onClick={() => navigate('contact')}
                 className="mt-8 px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-purple/50 text-white font-bold rounded-full transition-all hover:-translate-y-1"
               >
                 Get in Touch
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle title="Technical Arsenal" subtitle="Tools tailored for every stage of the digital product lifecycle." />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <SkillCard 
              category="Creative & UX" 
              skills={SKILLS[0].skills} 
              icon={<Palette size={24} />}
              colorClass="text-neon-purple"
            />
            <SkillCard 
              category="Automation & Dev" 
              skills={SKILLS[1].skills} 
              icon={<Terminal size={24} />}
              colorClass="text-neon-cyan"
            />
            <SkillCard 
              category="Artificial Intelligence" 
              skills={SKILLS[2].skills} 
              icon={<Cpu size={24} />}
              colorClass="text-yellow-400"
            />
          </div>
        </div>
      </section>

      <ProjectsSection onSelect={setSelectedProject} />

      {/* Contact Section - Updated to use navigation */}
      <section id="contact" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Ready to collaborate?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Head over to the full contact page to get in touch or send me a message.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('contact')}
              className="px-12 py-4 bg-gradient-to-r from-neon-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-purple/50 text-white font-bold rounded-full transition-all hover:-translate-y-1"
            >
              Go to Contact Page
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© {new Date().getFullYear()} F. Mohamad Musthak Ali. All rights reserved.</p>
        <p className="mt-2">Built with React, Tailwind, and Google Gemini API.</p>
      </footer>

      {/* Interactive Elements */}
      <ChatWidget />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
    </div>
  );
};

export default App;
