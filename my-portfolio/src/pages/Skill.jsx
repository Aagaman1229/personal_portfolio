import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPython, FaReact, FaHtml5, FaCss3 } from 'react-icons/fa';
import '../styles/Skill.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', icon: <FaPython />, color: '#306998', pct: 80 },
  { name: 'React',  icon: <FaReact  />, color: '#61dafb', pct: 90 },
  { name: 'HTML5',  icon: <FaHtml5  />, color: '#e44d26', pct: 75 },
  { name: 'CSS3',   icon: <FaCss3   />, color: '#2965f1', pct: 85 },
];

export default function Skill() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade+slide in
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Stagger each skill-item appearance
      gsap.from('.skill-item', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.2,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Animate each progress bar individually
      gsap.utils.toArray('.skill-item').forEach((item) => {
        const bar = item.querySelector('.skill-progress-bar');
        const pct = bar.dataset.pct;
        gsap.fromTo(bar,
          { width: 0 },
          {
            width: pct + '%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skill section" ref={sectionRef}>
      <h1 ref={titleRef}>My Skills</h1>
      {skills.map((s) => (
        <div className="skill-item" key={s.name}>
          <div className="skill-icon" style={{ color: s.color }}>
            {s.icon}
          </div>
          <div className="skill-name">{s.name}</div>
          <div className="skill-progress-container">
            <div
              className="skill-progress-bar"
              style={{ backgroundColor: s.color }}
              data-pct={s.pct}
            />
            <div className="skill-percentage">{s.pct}%</div>
          </div>
        </div>
      ))}
    </section>
  );
}
