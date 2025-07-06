import { Link, Element } from 'react-scroll';
import Home from './pages/Home';
import About from './pages/About';
import Skill from './pages/Skill';
import Projects from './pages/Projects';
import './styles/App.css';
import Theme from './Components/Theme';
import { useState } from 'react';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;

  // Check system/browser preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  return (
    <div className='app'>
      <div className='header'>
        <div className='logo'>
          <h1>h</h1>
        </div>

        <nav className='navbar'>
          <ul>
            <li><Link to="home" smooth={true} duration={500} offset={-30}>Home</Link></li>
            <li><Link to="about" smooth={true} duration={500} >About</Link></li>
            <li><Link to="skill" smooth={true} duration={500} offset={-30}>Skill</Link></li>
            <li><Link to="projects" smooth={true} duration={500} offset={-30}>Projects</Link></li>
            <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
          </ul>
        </nav>

        <div className='day'>
          <Theme  theme={theme} setTheme={setTheme}/>
        </div>
      </div>

      {/* Sections as scrollable Elements */}
      <Element name="home"><Home /></Element>
      <Element name="about"><About /></Element>
      <Element name="skill"><Skill /></Element>
      <Element name="projects"><Projects /></Element>
      <Element name="contact">
        <section className="section">
          <h1>Contact</h1>
          <p>This is the Contact section.</p>
        </section>
      </Element>
    </div>
  );
}

export default App;
