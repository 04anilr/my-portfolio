import React from 'react'

export const WorkItems = ({item, onSelect}) => {
  return (
  <div className="work_card" key={item.id}>
    <img src={item.image} alt="" className='work_img' />
    <h3 className="work_title">{item.title}</h3>
    <div className="work_button-container">
      <a href={item.demoLink} className="work_button" target='_blank' rel='noopener noreferrer'>
          Demo <i className="bx bx-right-arrow-alt work_button-icon"></i>
      </a>
      <span className="work_button" onClick={() => onSelect(item)}>
          Details <i className="bx bx-info-circle work_button-icon"></i>
      </span>
    </div>
  </div>
  );
};
