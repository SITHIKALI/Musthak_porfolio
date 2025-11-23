import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL_INFO } from '../constants';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {}

    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' });
      gsap.from('.hero-title', { y: 60, rotateX: 7, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.02 });
      gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 0.9, delay: 0.1 });

      // subtle shape motion linked to scroll
      gsap.to('.hero-shape', {
        y: -40,
        rotation: 6,
        duration: 1.4,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          markers: false,
        },
      });

      // Pin the header/hero section for a cinematic moment on larger viewports
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced && sectionRef.current) {
        const heroTL = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=700',
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 0.8,
            markers: false,
            invalidateOnRefresh: true,
          }
        });

        heroTL.to('.hero-title', { yPercent: -10, scale: 0.98, duration: 1, ease: 'power1.out' }, 0);
        heroTL.to('.hero-shape', { y: -60, rotation: 3, duration: 1.2, ease: 'power1.out', stagger: 0.08 }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow hero-shape"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-slow hero-shape" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
  <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm hero-badge">
          <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent font-semibold text-sm tracking-widest uppercase">
            UI/UX • Automation • AI
          </span>
        </div>
        
  <h1 className="hero-title text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
          Building Logic that <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-white to-neon-cyan">
            Feels Like Magic.
          </span>
        </h1>

        <p className="hero-sub text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors"
          >
            View Case Studies
          </button>
          <button 
             onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
             className="px-8 py-4 bg-transparent border border-slate-700 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors"
          >
            Contact Me
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;

