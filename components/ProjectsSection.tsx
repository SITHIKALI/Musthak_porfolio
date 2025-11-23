import React, { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';
import { gsap } from 'gsap'; // Keep this import for potential future use

const ProjectsSection: React.FC<{ onSelect?: (p: any) => void }> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // No complex scroll animations here — keep behavior simple and performant.
  // All project cards are styled with the glassmorphism glow in ProjectCard.

  return (
    <section id="projects" className="py-20 md:py-32 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Selected Case Studies</h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">A collection of design, automation, and game development projects.</p>
        </div>
        <div className="mt-12">
          <div ref={containerRef} className="projects-inner grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="project-card">
                <ProjectCard project={project} onClick={(p) => onSelect && onSelect(p)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
