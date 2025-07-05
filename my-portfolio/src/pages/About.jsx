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
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Reveal each paragraph with delay
      gsap.from('.about.section p', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 85%',
        },
      });
    }, aboutRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="about" ref={aboutRef}>
      <div className="about section">
        <h1>About Me</h1>
        <p>    I'm a backend web app developer who loves crafting scalable and efficient server-side architectures.</p>
        <p>
          I’m also deeply passionate about machine learning and its powerful applications in cybersecurity.
        </p>
        <p>
          Whether it's building REST APIs or analyzing patterns in security data, I thrive on solving real-world challenges through code.
        </p>
      </div>
    </div>
  );
}

export default About;
