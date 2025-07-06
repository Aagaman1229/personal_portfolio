// ProjectBox.jsx
import '../styles/ProjectBox.css';

function ProjectBox({ image, title, description, onClick }) {
  return (
    <div className="project-box" onClick={onClick}>
      <img src={image} alt={title} className="project-image" />
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
    </div>
  );
}
export default ProjectBox;