import React, { useState, useEffect } from 'react';

const TypewriterLogo: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Configuration for the animation sequence
  const phrases = [
    { text: "Musthak Ali", pause: 10000 },        // Type name, wait 10s
    { text: "Graphic Designer", pause: 3000 },    // Type role 1, wait 3s
    { text: "Automation Developer", pause: 0 }    // Type role 2, stop (0 pause implies stop)
  ];

  useEffect(() => {
    // Safety check if index goes out of bounds (though logic below prevents it)
    if (phraseIndex >= phrases.length) return;

    const currentPhraseObj = phrases[phraseIndex];
    const fullText = currentPhraseObj.text;
    
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // DELETING PHASE
      if (text === '') {
        // Finished deleting current phrase, move to next
        setIsDeleting(false);
        setPhraseIndex(prev => prev + 1);
        // Short pause before typing next phrase is handled by the natural typing delay of the next render
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
        }, 50); // Fast delete speed
      }
    } else {
      // TYPING PHASE
      if (text === fullText) {
        // Finished typing current phrase
        if (phraseIndex < phrases.length - 1) {
           // If not the last phrase, wait for the specified pause duration then start deleting
           timeout = setTimeout(() => {
             setIsDeleting(true);
           }, currentPhraseObj.pause);
        }
        // If it is the last phrase, do nothing (stop)
      } else {
         // Continue typing
         timeout = setTimeout(() => {
           setText(fullText.substring(0, text.length + 1));
         }, 120); // Natural typing speed
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <a href="#" aria-label="Musthak Ali - Portfolio" className="group flex items-center text-xl md:text-2xl font-display font-bold text-white tracking-tight hover:text-neon-purple transition-colors duration-300">
      <span className="text-neon-cyan mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{'>'}</span>
      {text}
      <span className="inline-block w-0.5 h-6 md:h-7 ml-1 bg-neon-purple animate-cursor-blink align-middle"></span>
    </a>
  );
};

export default TypewriterLogo;