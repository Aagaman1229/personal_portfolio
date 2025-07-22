import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ProjectBox from '../components/ProjectBox';
import '../styles/Projects.css';
import facerecog from '../assets/projects/facerecog.png'; 
import psyberly from '../assets/projects/psyberly.png';
import webapp from '../assets/projects/Webapp.png';


const projects = [
  {
    image: facerecog,
    title: 'Face-recognition system',
    description: 'Voice-based assistant using Python and NLP.',
  },
  {
    image: psyberly,
    title: 'Psyberly Website',
    description: 'Built with React and CSS animations.',
  },
  {
    image: webapp,
    title: 'Note App',
    description: 'Weather updates using OpenWeather API.',
  },
  // Add more projects as needed
];

function Projects() {
  const rowRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const gsapAnimation = useRef(null);

  // Create seamless infinite loop
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Calculate total width needed
    const itemWidth = 300; // Adjust to match your project box width
    const gap = 30; // Adjust to match your gap between items
    const totalWidth = (itemWidth + gap) * projects.length;

    // Double the projects array for seamless looping
    const duplicatedProjects = [...projects, ...projects];

    // Start the animation
    gsapAnimation.current = gsap.to(row, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Pause animation on hover
    const wrapper = wrapperRef.current;
    const handleMouseEnter = () => {
      if (gsapAnimation.current) gsapAnimation.current.pause();
    };
    const handleMouseLeave = () => {
      if (gsapAnimation.current) gsapAnimation.current.resume();
    };

    wrapper.addEventListener('mouseenter', handleMouseEnter);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (gsapAnimation.current) gsapAnimation.current.kill();
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="projects-section">
      <h1 className="projects-title">My Projects</h1>
      <div 
        className="projects-scroll-wrapper" 
        ref={wrapperRef}
      >
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