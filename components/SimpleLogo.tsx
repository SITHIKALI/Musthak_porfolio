import React from 'react';

const SimpleLogo: React.FC = () => {
  return (
    <a
      href="#"
      aria-label="Musthak Ali - Portfolio"
      className="group flex items-center text-xl md:text-2xl font-display font-bold text-white tracking-tight hover:text-neon-purple transition-colors duration-300"
    >
      <span className="text-neon-cyan mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{'>'}</span>
      <span className="hidden sm:inline">Musthak Ali</span>
      <span className="sm:hidden">MA</span>
      <span className="inline-block w-0.5 h-6 md:h-7 ml-1 bg-neon-purple animate-cursor-blink align-middle"></span>
    </a>
  );
};

export default SimpleLogo;