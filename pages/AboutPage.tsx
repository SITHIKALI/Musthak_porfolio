import React from 'react';
import { Camera, Clapperboard, Gamepad2, ArrowLeft } from 'lucide-react';
import EducationSection from '../components/EducationSection';

interface NavigationContextType {
  navigate?: (path: string) => void;
}

const AboutPage: React.FC<NavigationContextType> = ({ navigate }) => {
  const handleBackClick = () => {
    if (navigate) {
      navigate('home');
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen text-slate-200 relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <button 
            onClick={handleBackClick}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-20 md:py-32 bg-slate-900/50 overflow-hidden pt-32">
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
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                  The Human Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">The Logic</span>
                </h1>
                
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
                  <div className="flex items-center gap-2 hover:text-neon-purple transition-colors cursor-pointer">
                    <Camera size={18} /> Photography
                  </div>
                  <div className="flex items-center gap-2 hover:text-neon-cyan transition-colors cursor-pointer">
                    <Clapperboard size={18} /> Video Editing
                  </div>
                  <div className="flex items-center gap-2 hover:text-pink-500 transition-colors cursor-pointer">
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

                {/* Education Section removed from here to render full-width below */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education section - rendered full width below the about section to avoid layout clipping */}
      <EducationSection />

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© {new Date().getFullYear()} F. Mohamad Musthak Ali. All rights reserved.</p>
        <p className="mt-2">Built with React, Tailwind, and Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
