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
      <div className="articles-container container" id='blog'>
        <h1 className='articles'>Articles by Anil Rajput</h1>
        <ul>
          {articles.map(article => (
            <li className="article" key={article.id}>
              <div className='articles-img'>
              <img src={article.cover_image} alt={article.title} /> {/* Added image tag */}
              </div>
             
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
