import { Link, Element } from 'react-scroll';
import Home from './pages/Home';
import About from './pages/About';
import Skill from './pages/Skill';
import './styles/App.css';
import Theme from './Components/Theme';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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
            <li><Link to="projects" smooth={true} duration={500}>Projects</Link></li>
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
      <Element name="projects">
        <section className="section">
          <h1>Projects</h1>
          <p>This is the Projects section.</p>
        </section>
      </Element>
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
