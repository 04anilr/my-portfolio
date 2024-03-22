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
    <div className="container">
      <h1 className='articles'>Articles by Anil Rajput</h1>
      <ul>
        {articles.map(article => (
          <li className="article" key={article.id}>
            <img src={article.cover_image} alt={article.title} /> {/* Added image tag */}
            <div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url}><button className="buttons">Read more</button></a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
