import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, Download, CheckCircle, Loader2, Linkedin, Github, ArrowLeft, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface NavigationContextType {
  navigate?: (path: string) => void;
}

const ContactPage: React.FC<NavigationContextType> = ({ navigate }) => {
  console.log('ContactPage component rendered');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Form reveal and resume micro-interaction
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { gsap.registerPlugin((ScrollTrigger as any)); } catch (e) {}

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const formEl = formRef.current;
    if (formEl) {
      const fields = formEl.querySelectorAll('input, textarea, button');
      if (prefersReduced) {
        gsap.set(fields, { opacity: 1, y: 0 });
      } else {
        gsap.from(fields, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: formEl,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }

    // Resume button micro-interaction
    const btn = resumeBtnRef.current;
    let hoverTween: any = null;
    const onEnter = () => hoverTween && hoverTween.play();
    const onLeave = () => hoverTween && hoverTween.reverse();

    if (btn && !prefersReduced) {
      hoverTween = gsap.to(btn, { boxShadow: '0 18px 40px rgba(168,85,247,0.16)', scale: 1.02, duration: 0.36, ease: 'power2.out', paused: true });
      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);
    }

    return () => {
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
      if (btn) {
        btn.removeEventListener('mouseenter', onEnter);
        btn.removeEventListener('mouseleave', onLeave);
      }
      if (hoverTween) hoverTween.kill();
    };
  }, []);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addToast('Please fill in all required fields correctly', 'error');
      return;
    }

    setStatus('loading');

    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xyzgweqo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        addToast("Message sent! I'll get back to you soon.", 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      addToast('Failed to send message. Please try again or email directly.', 'error');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

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

      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <section className="py-20 md:py-32 relative z-10 pt-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Let's Build the Future</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Ready to collaborate on intelligent design systems or automation workflows? Get in touch!
            </p>
          </div>

          {/* Toast Notifications */}
          <div className="fixed top-24 right-6 z-50 space-y-2">
            {toasts.map(toast => (
              <div 
                key={toast.id}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg backdrop-blur-md border animate-fade-in-up ${
                  toast.type === 'success' 
                    ? 'bg-green-500/20 border-green-500/50 text-green-200' 
                    : 'bg-red-500/20 border-red-500/50 text-red-200'
                }`}
              >
                {toast.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="font-medium">{toast.message}</span>
              </div>
            ))}
          </div>

          {/* Main Contact Grid */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Contact Info & Resume Sidebar */}
            <div className="md:col-span-2 space-y-8">
              {/* Contact Info Card */}
              <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-8 hover:border-white/20 transition-all duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Mail size={24} className="text-neon-purple" />
                    Contact Info
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Email */}
                    <a 
                      href="mailto:mohamadmusthakali@gmail.com" 
                      className="flex items-center gap-3 text-slate-300 hover:text-neon-purple transition-colors p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 group"
                    >
                      <div className="p-2.5 bg-neon-purple/20 rounded-lg group-hover:bg-neon-purple/30 transition-colors">
                        <Mail size={20} className="text-neon-purple" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Email</p>
                        <p className="text-sm font-medium truncate">mohamadmusthakali@gmail.com</p>
                      </div>
                    </a>

                    {/* LinkedIn */}
                    <a 
                      href={PERSONAL_INFO.socials.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-3 text-slate-300 hover:text-neon-cyan transition-colors p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 group"
                    >
                      <div className="p-2.5 bg-neon-cyan/20 rounded-lg group-hover:bg-neon-cyan/30 transition-colors">
                        <Linkedin size={20} className="text-neon-cyan" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">LinkedIn</p>
                        <p className="text-sm font-medium">Connect with me</p>
                      </div>
                    </a>

                    {/* GitHub */}
                    <a 
                      href={PERSONAL_INFO.socials.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 group"
                    >
                      <div className="p-2.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                        <Github size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">GitHub</p>
                        <p className="text-sm font-medium">View my code</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Resume Download */}
                <div className="pt-6 border-t border-slate-700/50">
                  <a 
                    ref={resumeBtnRef}
                    href="/assets/resume/musty_Resume2.0-1-1.pdf" 
                    download="Musthak_Ali_Resume.pdf"
                    className="resume-btn group flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-2xl transition-all duration-300"
                  >
                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                    <span>Download Resume</span>
                  </a>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    PDF • musty_Resume2.0-1-1.pdf
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 hover:border-neon-purple/30 transition-all duration-300 shadow-2xl shadow-purple-900/20">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                          errors.name 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-slate-700 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50'
                        }`}
                        placeholder="John Doe"
                          />
                      </div>
                      {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-slate-700 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={14} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                      Subject *
                    </label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                        errors.subject 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-700 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50'
                      }`}
                      placeholder="e.g., Project Collaboration"
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                      Message *
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all duration-200 resize-none ${
                        errors.message 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-700 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50'
                      }`}
                      placeholder="Tell me about your project, idea, or collaboration opportunity..."
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={status === 'loading' || status === 'success'}
                    className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      status === 'success' 
                        ? 'bg-green-500/80 hover:bg-green-600 text-white shadow-lg shadow-green-500/30' 
                        : status === 'error'
                        ? 'bg-red-500/80 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                        : 'bg-gradient-to-r from-neon-purple to-neon-cyan hover:shadow-lg hover:shadow-neon-purple/50 text-white hover:-translate-y-1'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </>
                    ) : status === 'error' ? (
                      <>
                        <AlertCircle size={20} />
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    * All fields are required. I'll respond within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-slate-600 text-sm border-t border-slate-900 relative z-10 mt-20">
        <p>© {new Date().getFullYear()} F. Mohamad Musthak Ali. All rights reserved.</p>
        <p className="mt-2">Built with React, Tailwind, and Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
