import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight mb-3">
        {title}
        <span className="block h-1 w-20 bg-neon-purple mt-2 rounded-full opacity-80 mx-auto md:mx-0" 
              style={{ marginLeft: align === 'center' ? 'auto' : '0', marginRight: align === 'center' ? 'auto' : '0' }}></span>
      </h2>
      {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
