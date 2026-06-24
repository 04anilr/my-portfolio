import React, { useEffect, useState } from 'react';
import "./work.css";
import { projectsData } from './Data';
import { projectsNav } from './Data';
import { WorkItems } from './WorkItems';

export const Works = () => {
  const [item, setItem] = useState({ name: 'all'});
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const getCategoryCount = (categoryName) => {
    if (categoryName.toLowerCase() === 'all') {
      return projectsData.length;
    }
    return projectsData.filter(proj => proj.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  useEffect(() => {
    if(item.name === 'all') {
      setProjects(projectsData);
    }

    else {
      const newProjects = projectsData.filter((project) => {
        return project.category.toLowerCase() === item.name;
      });
      setProjects(newProjects);
    }
  },[item]);

  const handleClick = (e, index) => {
    // Extract category name properly ignoring nested elements
    const categoryText = projectsNav[index].name.toLowerCase();
    setItem({ name: categoryText });
    setActive(index);
  };

  return (
   <div>
     <div className="work_filters">
      {projectsNav.map((item, index) => {
        return (
          <span onClick={(e) => {
            handleClick(e, index);
          }} className={`${active === index ? 'active-work' : ''} work_item`}
           key={index}>
            {item.name} <span className="work_item-count">{getCategoryCount(item.name)}</span>
          </span>
        );
      })}
    </div>
    <div className="work_container container grid">
      {projects.map((item) => {
        return <WorkItems item={item} key={item.id} onSelect={setSelectedProject}/>;
      })}
    </div>

    {selectedProject && (
      <div className="services_modal active-modal" onClick={() => setSelectedProject(null)}>
        <div className="services_modal-content" onClick={(e) => e.stopPropagation()}>
          <i onClick={() => setSelectedProject(null)} className="uil uil-times services_modal-close"></i>
          <h3 className="services_modal-title">{selectedProject.title}</h3>
          
          <div className="project_modal-img-container">
            <img src={selectedProject.image} alt={selectedProject.title} className="project_modal-img" />
          </div>
          
          <p className="services_modal-description" style={{ marginTop: '1rem', padding: '0 1rem', textAlign: 'left' }}>
            {selectedProject.description}
          </p>

          {(selectedProject.problem || selectedProject.solution || selectedProject.result) && (
            <div className="project_case">
              {selectedProject.problem && (
                <div className="project_case-block project_case-block--problem">
                  <h4 className="project_case-label">Problem</h4>
                  <p className="project_case-text">{selectedProject.problem}</p>
                </div>
              )}
              {selectedProject.solution && (
                <div className="project_case-block project_case-block--solution">
                  <h4 className="project_case-label">Solution</h4>
                  <p className="project_case-text">{selectedProject.solution}</p>
                </div>
              )}
              {selectedProject.result && (
                <div className="project_case-block project_case-block--result">
                  <h4 className="project_case-label">Result</h4>
                  <p className="project_case-text">{selectedProject.result}</p>
                </div>
              )}
            </div>
          )}

          <div className="project_modal-tech">
            <h4 className="project_modal-tech-title">Technologies Used</h4>
            <div className="project_modal-tags">
              {selectedProject.techStack.map((tech, idx) => (
                <span key={idx} className="project_modal-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project_modal-actions">
            {selectedProject.demoLink && (
              <a href={selectedProject.demoLink} className="button button--flex" target="_blank" rel="noopener noreferrer">
                Live Demo <i className="bx bx-link-external button_icon"></i>
              </a>
            )}
            {selectedProject.githubLink && (
              <a href={selectedProject.githubLink} className="button button--flex button--outline" target="_blank" rel="noopener noreferrer">
                Code <i className="bx bxl-github button_icon"></i>
              </a>
            )}
            {selectedProject.videoLink && (
              <a href={selectedProject.videoLink} className="button button--flex button--outline" target="_blank" rel="noopener noreferrer">
                Video <i className="bx bx-play-circle button_icon"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    )}
    </div>
  );
};
