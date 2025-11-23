import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize GSAP + plugins once
export function initGsap() {
  if (typeof window === 'undefined') return;
  // Avoid double-registration in HMR/dev
  if ((gsap as any).__gsapInitialized) return;

  gsap.registerPlugin(ScrollTrigger);
  (gsap as any).__gsapInitialized = true;

  // sensible defaults
  ScrollTrigger.defaults({ scrub: false, markers: false });
}

// Lightweight global parallax for the star background
export function initStarParallax() {
  if (typeof window === 'undefined') return;
  try {
    const stars = document.querySelectorAll('.star-bg .star');
    if (!stars || stars.length === 0) return;

    // Give a tiny depth translation to each star based on index
    gsap.to(stars, {
      y: (i) => `-${10 + (i % 6) * 6}%`,
      x: (i) => `${(i % 5) * 0.6}rem`,
      rotation: (i) => (i % 2 === 0 ? 0.2 : -0.2),
      ease: 'none',
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.08, from: 'center' },
    });

    // Parallax on scroll (subtle)
    gsap.to('.star-bg', {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      },
    });
  } catch (e) {
    // fail gracefully
    // console.warn('Star parallax init failed', e);
  }
}

// Generic helper to create a scroll-tween with sensible defaults
export function createScrollTween(selector: string, vars: any = {}, triggerOverrides: any = {}) {
  if (typeof window === 'undefined') return null;
  try {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: selector,
        start: 'top center',
        end: 'bottom top',
        scrub: Math.max(0, triggerOverrides.scrub ?? true),
        pin: triggerOverrides.pin ?? false,
        markers: triggerOverrides.markers ?? false,
        invalidateOnRefresh: true,
        ...triggerOverrides,
      },
    });

    if (vars.from) tl.from(selector, vars.from);
    if (vars.to) tl.to(selector, vars.to, 0);
    return tl;
  } catch (e) {
    return null;
  }
}
