import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Skill() {
  const skillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about.section', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)', // spring-like effect
        scrollTrigger: {
          trigger: skillRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, skillRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about" ref={skillRef}>
      <div className="skill section">
        <h1>Skill</h1>
        <p>As a web developer, I have a diverse skill set that includes:</p>
      </div>
    </div>
  );
}

export default Skill;
