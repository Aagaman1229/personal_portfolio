import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about.section', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)', // spring-like effect
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about" ref={aboutRef}>
      <div className="about section">
        <h1>About Me</h1>
        <p>Hello! I'm a passionate web developer with a love for creating dynamic and responsive web applications.</p>
        <p>I enjoy working with the latest technologies and continuously learning new skills.</p>
      </div>
    </div>
  );
}

export default About;
