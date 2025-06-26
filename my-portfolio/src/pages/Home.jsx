import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".home-content", {
        y: 100,
        opacity: 0.3,
        duration: 2,
        stagger: 0.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: homeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home" ref={homeRef}>
      <div className="home-content">
        <h1>Welcome to My Portfolio</h1>
        <p>This is the home page of my portfolio website.</p>
        <p>Here you can find information about my projects, skills, and experience.</p>
      </div>
    </div>
  );
}

export default Home;
