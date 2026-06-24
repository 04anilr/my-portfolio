import React from 'react'

export const WorkItems = ({item, onSelect}) => {
  const isCaseStudy = item.category === 'business';
  return (
  <div className="work_card" key={item.id}>
    <div className="work_img-wrapper">
      <img src={item.image} alt={item.title} className='work_img' loading="lazy" />
      {isCaseStudy && <span className="work_badge">Case Study</span>}
    </div>
    <h3 className="work_title">{item.title}</h3>
    {item.techStack && (
      <div className="work_tech">
        {item.techStack.slice(0, 4).map((tech) => (
          <span className="work_tech-badge" key={tech}>{tech}</span>
        ))}
      </div>
    )}
    <div className="work_button-container">
      {item.demoLink && (
        <a href={item.demoLink} className="work_button" target='_blank' rel='noopener noreferrer'>
            Demo <i className="bx bx-right-arrow-alt work_button-icon"></i>
        </a>
      )}
      <span className="work_button" onClick={() => onSelect(item)}>
          {isCaseStudy ? 'Read Case Study' : 'Details'} <i className="bx bx-info-circle work_button-icon"></i>
      </span>
    </div>
  </div>
  );
};
