import React, { useState } from 'react';
import { Mail, Send, Download, CheckCircle, Loader2, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call delay
    setTimeout(() => {
      // In a real scenario, use fetch to Formspree/EmailJS here
      console.log("Form Submitted", formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Let's Build the Future</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to collaborate on intelligent design systems or automation workflows?
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 bg-slate-900/50 rounded-3xl p-1 md:p-12 border border-slate-800 backdrop-blur-sm">
          
          {/* Contact Info & Resume */}
          <div className="md:col-span-2 space-y-8 flex flex-col justify-between h-full p-6 md:p-0 order-2 md:order-1">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                 <a href="mailto:mohamadmusthakali@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-neon-purple transition-colors p-3 bg-slate-800/50 rounded-xl">
                   <div className="p-2 bg-slate-700 rounded-lg">
                     <Mail size={20} />
                   </div>
                   <span className="text-sm">mohamadmusthakali@gmail.com</span>
                 </a>
                 <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-neon-cyan transition-colors p-3 bg-slate-800/50 rounded-xl">
                   <div className="p-2 bg-slate-700 rounded-lg">
                     <Linkedin size={20} />
                   </div>
                   <span className="text-sm">LinkedIn Profile</span>
                 </a>
                 <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-3 bg-slate-800/50 rounded-xl">
                   <div className="p-2 bg-slate-700 rounded-lg">
                     <Github size={20} />
                   </div>
                   <span className="text-sm">GitHub Profile</span>
                 </a>
              </div>
            </div>

            <div>
              <a 
                href="/assets/resume/musty_Resume2.0-1-1.pdf" 
                download="Musthak_Ali_Resume.pdf"
                className="group flex items-center justify-center gap-3 w-full py-4 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-white/5 hover:shadow-white/20"
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-700 order-1 md:order-2">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="Project Collaboration"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-neon-purple to-neon-cyan hover:opacity-90 text-white'
                }`}
              >
                {status === 'loading' ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={20} /> Message Sent!
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;