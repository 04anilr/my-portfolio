import React, { useState, useEffect } from 'react';
import './project.css';

export const Project = () => {
  const [articles, setArticles] = useState([]);
  const maxArticlesToShow = 6;
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=04anilr');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.slice(2, maxArticlesToShow));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="project-section section" id="articles-section">
      <h2 className="section_title">Articles by Anil Rajput</h2>
      <span className="section_subtitle">My recent write-ups</span>

      <div className="project-articles__container container">
        <ul className="project-articles__list">
          {articles.map(article => (
            <li className="project-article-card" key={article.id}>
              <div className="project-article-card__img-wrapper">
                {article.cover_image ? (
                  <img 
                    src={article.cover_image} 
                    alt={article.title} 
                    className="project-article-card__img"
                  />
                ) : (
                  <div className="project-article-card__img-fallback">
                    <i className="uil uil-file-alt"></i>
                  </div>
                )}
              </div>
              <div className="project-article-card__content">
                <h3 className="project-article-card__title">{article.title}</h3>
                <p className="project-article-card__description">{article.description}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-article-card__link"
                >
                  <button className="project-article-card__btn">Read more</button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
