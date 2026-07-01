import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './blog.css';

export const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null); // full-post modal (Supabase blogs)
    const maxArticlesToShow = 4;

    useEffect(() => {
      // Blogs written in the portfolio and stored in Supabase
      const fetchSupabaseBlogs = async () => {
        try {
          const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

          if (error) throw error;

          // Normalize to the shape the card renderer expects
          return (data || []).map((b) => ({
            id: `supabase-${b.id}`,
            title: b.title,
            cover_image: b.cover_image,
            readable_publish_date: b.created_at
              ? new Date(b.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : null,
            reading_time_minutes: b.reading_time,
            description: b.excerpt,
            tag_list: b.tags || [],
            isInternal: true,
            content: b.content,
          }));
        } catch (error) {
          console.error('Error fetching Supabase blogs:', error.message);
          return [];
        }
      };

      // Existing external articles from dev.to
      const fetchDevtoArticles = async () => {
        try {
          const response = await fetch('https://dev.to/api/articles?username=04anilr');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data.map((a) => ({ ...a, isInternal: false }));
        } catch (error) {
          console.error('Error fetching articles:', error);
          return [];
        }
      };

      const loadAll = async () => {
        const [supa, devto] = await Promise.all([fetchSupabaseBlogs(), fetchDevtoArticles()]);
        // Show my own Supabase blogs first, then dev.to articles
        setArticles([...supa, ...devto].slice(0, maxArticlesToShow));
      };

      loadAll();
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
                  {article.isInternal ? (
                    <button className="buttons" onClick={() => setSelectedBlog(article)}>
                      Read more
                    </button>
                  ) : (
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <button className="buttons">Read more</button>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Full-post reading modal for Supabase blogs */}
        {selectedBlog && (
          <div className="blog-modal__overlay active" onClick={() => setSelectedBlog(null)}>
            <div className="blog-modal__content" onClick={(e) => e.stopPropagation()}>
              <i className="uil uil-times blog-modal__close" onClick={() => setSelectedBlog(null)}></i>

              {selectedBlog.cover_image && (
                <img className="blog-modal__cover" src={selectedBlog.cover_image} alt={selectedBlog.title} />
              )}
              <h2 className="blog-modal__title">{selectedBlog.title}</h2>
              <div className="article-metadata">
                {selectedBlog.readable_publish_date && (
                  <span className="article-date">
                    <i className="uil uil-calendar-alt"></i> {selectedBlog.readable_publish_date}
                  </span>
                )}
                {selectedBlog.reading_time_minutes && (
                  <span className="article-reading-time">
                    <i className="uil uil-clock"></i> {selectedBlog.reading_time_minutes} min read
                  </span>
                )}
              </div>
              {selectedBlog.tag_list && selectedBlog.tag_list.length > 0 && (
                <div className="article-tags" style={{ height: 'auto', marginBottom: '1rem' }}>
                  {selectedBlog.tag_list.map((tag, idx) => (
                    <span key={idx} className="article-tag">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="blog-modal__body">{selectedBlog.content}</div>
            </div>
          </div>
        )}
      </section>
    );
  };
