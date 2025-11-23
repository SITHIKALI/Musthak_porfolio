import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const educations = [
  {
    id: 'e1',
    title: 'B.Sc in Computer Science',
    institution: 'Karpagam Academy of Higher Education',
    duration: 'Aug 2022 – May 2025',
    desc: 'Comprehensive study in computer science fundamentals, programming, and emerging technologies. Focus on algorithms, systems and full-stack development.'
  },
  {
    id: 'e2',
    title: 'Higher Secondary Certificate (HSC)',
    institution: 'Crescent Matric Higher Secondary School',
    duration: '2021 – 2022',
    desc: 'Completed higher secondary education with focus on science and mathematics, building foundational skills for computing and problem solving.'
  },
  {
    id: 'e3',
    title: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Crescent Matric Higher Secondary School',
    duration: '2020',
    desc: 'Successfully completed secondary education, establishing a strong academic foundation and study habits.'
  }
];

const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}

    const items = containerRef.current?.querySelectorAll('.edu-item');
    const line = containerRef.current?.querySelector('.vertical-line') as HTMLElement | null;

    // Fade-in via IntersectionObserver as a fallback and for accessibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
    );
    items?.forEach((el) => observer.observe(el));

    // ScrollTrigger: pin the timeline and drive a progress animation on the vertical line
    if (line && containerRef.current) {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=80',
        end: () => `+=${(items?.length ?? 3) * 320}`,
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / Math.max(1, (items?.length ?? 3)),
          duration: 0.5,
          directional: true,
          ease: 'power3.inOut',
        },
        invalidateOnRefresh: true,
      });

      // animate line height progress
      gsap.to(line, {
        height: `${(items?.length ?? 3) * 100}%`,
        ease: 'none',
        scrollTrigger: st,
      });

      return () => {
        st.kill();
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-slate-900 to-black">

      {/* Parallax stars layers */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="stars s1 pointer-events-none">
          <span style={{ left: '6%', top: '90%' }} className="star" />
          <span style={{ left: '20%', top: '95%' }} className="star" />
          <span style={{ left: '35%', top: '92%' }} className="star" />
          <span style={{ left: '50%', top: '96%' }} className="star" />
        </div>
        <div className="stars s2 pointer-events-none">
          <span style={{ left: '10%', top: '85%' }} className="star" />
          <span style={{ left: '28%', top: '88%' }} className="star" />
          <span style={{ left: '62%', top: '91%' }} className="star" />
          <span style={{ left: '80%', top: '89%' }} className="star" />
        </div>
        <div className="stars s3 pointer-events-none">
          <span style={{ left: '5%', top: '78%' }} className="star" />
          <span style={{ left: '45%', top: '84%' }} className="star" />
          <span style={{ left: '70%', top: '80%' }} className="star" />
          <span style={{ left: '90%', top: '83%' }} className="star" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Educational Background</h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">A concise timeline of academic milestones that shaped my journey into tech.</p>
        </div>

        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-6 top-0 w-0.5 bg-gray-700/50 ml-0 vertical-line" style={{height: '20%'}} />

            <ol className="space-y-8 md:space-y-12">
              {educations.map((edu, idx) => (
                <li key={edu.id} className="edu-item opacity-0 transform translate-y-6 transition duration-700 ease-out" style={{ transitionDelay: `${idx * 180}ms` }}>
                  <div className="md:flex md:items-start md:gap-6">
                    {/* Numbered circle */}
                    <div className="md:flex-shrink-0 flex items-start md:items-center">
                      <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold text-sm md:text-base shadow-lg hover:scale-105 transition-transform duration-300 ease-out ring-1 ring-white/5" style={{ cursor: 'default' }}>
                        <span className="group">
                          <span className="number">{idx + 1}</span>
                        </span>
                        <span className="absolute inset-0 rounded-full hover:animate-pulse-slow" aria-hidden />
                      </div>

                      {/* Connector for mobile */}
                      <div className="md:hidden ml-4 border-l-2 h-6 border-gray-700/40" />
                    </div>

                    {/* Content */}
                    <div className="mt-4 md:mt-0 md:pl-6">
                      <h3 className="text-lg md:text-xl font-bold text-gray-100">{edu.title}</h3>
                      <p className="text-sm italic text-gray-300 mt-1">{edu.institution}</p>
                      <p className="text-xs text-gray-400 mt-1">{edu.duration}</p>
                      <p className="text-sm text-gray-300 mt-3">{edu.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

          </div>
        </div>
      </div>

      <style>{`
        .star {
          position: absolute;
          display: block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          opacity: 0.9;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.08));
        }
        .stars.s1 .star { animation: rise 36s linear infinite; }
        .stars.s2 .star { animation: rise 26s linear infinite; }
        .stars.s3 .star { animation: rise 44s linear infinite; }

        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0.95 }
          50% { opacity: 0.7 }
          100% { transform: translateY(-140vh) scale(1.2); opacity: 0 }
        }

        /* Slide up + fade in when in view */
        .edu-item.in-view {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* gentle pulse on hover for numbered circle */
        .edu-item .hover\:animate-pulse-slow:hover { animation: pulseSlow 1.6s infinite; }

        @keyframes pulseSlow {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(168,85,247,0.15); }
          50% { transform: scale(1.03); box-shadow: 0 6px 30px rgba(6,182,212,0.06); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(168,85,247,0.0); }
        }

        /* small responsive tweak to align vertical line and circles */
        @media (min-width: 768px) {
          .edu-item { display: block; }
          .edu-item .number { display: inline-block; }
        }
      `}</style>
    </section>
  );
};

export default EducationSection;
