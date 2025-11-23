import React from 'react';
import { Figma, Code2, Bot, Database, Smartphone, Workflow, Cpu, Layers } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-[10%] opacity-10 animate-float">
          <Figma size={64} className="text-neon-purple" />
        </div>
        <div className="absolute top-40 right-[15%] opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <Code2 size={64} className="text-neon-cyan" />
        </div>
        <div className="absolute bottom-20 left-[20%] opacity-10 animate-float" style={{ animationDelay: '4s' }}>
          <Bot size={64} className="text-white" />
        </div>
        <div className="absolute bottom-40 right-[10%] opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <Workflow size={64} className="text-pink-500" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            I build experiences that <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">think.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            I create innovative UI/UX designs and intelligent automations—from pixel-perfect interfaces to no-code AI agents that solve real business problems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Service Card 1: Design */}
          <div className="group p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/60 hover:border-neon-purple/50 transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-neon-purple/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Layers size={32} className="text-neon-purple" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Intelligent Design</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
                <span>Figma & Framer Prototypes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
                <span>User Research & Flows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
                <span>Dark-Themed Dashboards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-purple rounded-full"></span>
                <span>Responsive Web Interfaces</span>
              </li>
            </ul>
          </div>

          {/* Service Card 2: Automation */}
          <div className="group p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/60 hover:border-neon-cyan/50 transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-neon-cyan/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Workflow size={32} className="text-neon-cyan" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Workflow Automation</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                <span>Excel Macros & Scripts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                <span>Web Scraping & Data Mining</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                <span>WhatsApp Automation (Py/n8n)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                <span>Data Pipeline Architectures</span>
              </li>
            </ul>
          </div>

          {/* Service Card 3: AI Agents */}
          <div className="group p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md hover:bg-slate-800/60 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Cpu size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Agent Development</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>Custom Chatbots (Botpress)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>Gemini API Integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>RAG & Knowledge Bases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>Google Workspace Sync</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300">
            <Smartphone size={18} className="animate-pulse text-neon-purple" />
            <span className="font-medium">Let’s automate the mundane and design the meaningful.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;