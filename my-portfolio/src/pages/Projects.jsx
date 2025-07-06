// Projects.jsx
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ProjectBox from '../components/ProjectBox';
import '../styles/Projects.css';

const projects = [
  {
    image: '../assets/projects/p1.png',
    title: 'AI Assistant',
    description: 'Voice-based assistant using Python and NLP.',
  },
  {
    image: '../assets/projects/p2.png',
    title: 'Portfolio Website',
    description: 'Built with React and CSS animations.',
  },
  {
    image: '../assets/projects/p3.png',
    title: 'Weather App',
    description: 'Weather updates using OpenWeather API.',
  },
  // Repeat or add more...
];

function Projects() {
  const rowRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const gsapAnimation = useRef(null);

  // Start GSAP auto-scroll
  useEffect(() => {
    const row = rowRef.current;
    gsapAnimation.current = gsap.to(row, {
      x: () => `-=${row.scrollWidth / 2}`,
      duration: 40,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % row.scrollWidth)
      }
    });

    return () => {
      if (gsapAnimation.current) gsapAnimation.current.kill();
    };
  }, []);

  // Enable drag-to-scroll
  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - wrapper.offsetLeft);
      setScrollLeft(wrapper.scrollLeft);

      if (gsapAnimation.current) gsapAnimation.current.pause();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = x - startX;
      wrapper.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (gsapAnimation.current) gsapAnimation.current.resume();
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      if (gsapAnimation.current) gsapAnimation.current.resume();
    };

    wrapper.addEventListener('mousedown', handleMouseDown);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseup', handleMouseUp);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mousedown', handleMouseDown);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseup', handleMouseUp);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="projects-section">
      <h1 className="projects-title">My Projects</h1>
      <div className="projects-scroll-wrapper" ref={wrapperRef}>
        <div className="projects-row" ref={rowRef}>
          {[...projects, ...projects].map((project, i) => (
            <ProjectBox
              key={i}
              image={project.image}
              title={project.title}
              description={project.description}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="popup-overlay" onClick={() => setActiveProject(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeProject.image} alt={activeProject.title} />
            <h2>{activeProject.title}</h2>
            <p>{activeProject.description}</p>
            <button onClick={() => setActiveProject(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
