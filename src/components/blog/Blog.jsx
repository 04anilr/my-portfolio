import React, { useState, useEffect } from 'react';
import './blog.css';

export const Blog = () => {
    const [articles, setArticles] = useState([]);
    const maxArticlesToShow = 4;
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch('https://dev.to/api/articles?username=04anilr');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setArticles(data.slice(0, maxArticlesToShow));
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      };
  
      fetchArticles();
    }, []);
  
    return (
      <section className="blog section" id="blog">
        <h2 className="section_title">Blogs</h2>
        <span className="section_subtitle">My technical articles</span>

        <div className="articles-container container">
          <ul>
            {articles.map(article => (
              <li className="article" key={article.id}>
                <div className='articles-img'>
                  {article.cover_image ? (
                    <img src={article.cover_image} alt={article.title} />
                  ) : (
                    <div className="articles-img-fallback">
                      <i className="uil uil-file-alt"></i>
                    </div>
                  )}
                </div>
               
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <div className="article-metadata">
                    {article.readable_publish_date && (
                      <span className="article-date">
                        <i className="uil uil-calendar-alt"></i> {article.readable_publish_date}
                      </span>
                    )}
                    {article.reading_time_minutes && (
                      <span className="article-reading-time">
                        <i className="uil uil-clock"></i> {article.reading_time_minutes} min read
                      </span>
                    )}
                  </div>
                  <p className="article-description">{article.description}</p>
                  {article.tag_list && article.tag_list.length > 0 && (
                    <div className="article-tags">
                      {article.tag_list.map((tag, idx) => (
                        <span key={idx} className="article-tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <button className="buttons">Read more</button>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };
