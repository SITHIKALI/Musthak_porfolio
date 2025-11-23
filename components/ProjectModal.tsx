import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Layers, Code } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 shadow-2xl relative animate-float" style={{ animationDuration: '0.5s', animationName: 'fadeIn' }}>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-slate-800 rounded-full text-white z-10 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="h-64 md:h-80 w-full relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:left-10">
             <span className="px-3 py-1 bg-neon-purple text-white text-xs font-bold rounded-full uppercase tracking-wide mb-2 inline-block">
               {project.category}
             </span>
             <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
            </div>

            {project.details?.type === 'code' && project.details.codeSnippet && (
               <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-sm text-slate-300 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-3 text-slate-500 pb-2 border-b border-slate-800">
                    <Code size={16} /> 
                    <span>Automation Logic Snippet</span>
                  </div>
                  <pre>{project.details.codeSnippet}</pre>
               </div>
            )}

            {project.details?.type === 'design' && project.details.artifacts && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers size={20} className="text-neon-purple" /> Design Artifacts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.details.artifacts.map((art, idx) => (
                    <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
                      <div className="w-full h-32 bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-slate-500">
                        {/* Placeholder for artifact image */}
                        <span>{art} Preview</span>
                      </div>
                      <span className="text-sm text-slate-300 font-medium">{art}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Challenge</h3>
              <p className="text-slate-400 text-sm">
                Balancing technical constraints with user needs to create a seamless experience.
              </p>
            </div>
            
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                View Project <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;