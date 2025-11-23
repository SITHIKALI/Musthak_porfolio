import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Code2, Paintbrush } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="glow-card group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" />
      
      <div className="h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-neon-cyan text-xs font-bold uppercase tracking-wider mb-1">{project.category}</p>
            <h3 className="text-2xl font-display font-bold text-white mb-1">{project.title}</h3>
            <p className="text-slate-400 text-sm line-clamp-2">{project.subtitle}</p>
          </div>
          <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight className="text-white" size={20} />
          </div>
        </div>
  </div>

      {/* Type Indicator Badge */}
      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
         {project.details?.type === 'design' && <Paintbrush size={14} className="text-neon-purple" />}
         {(project.details?.type === 'code' || project.category.includes("Auto")) && <Code2 size={14} className="text-neon-cyan" />}
         <span className="text-xs font-medium text-white capitalize">{project.details?.type || 'Project'}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
