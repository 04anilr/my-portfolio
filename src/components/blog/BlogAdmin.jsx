import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import '../admin/admin.css';
import './blog.css';

// Turn a title into a URL-friendly slug
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Rough reading-time estimate (~200 words per minute)
const estimateReadingTime = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const BlogAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '1') {
      setIsAuthenticated(true);
      setMessage({ text: '', type: '' });
    } else {
      setMessage({ text: 'Invalid passcode', type: 'error' });
    }
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setTags('');
    setCoverUrl('');
    setCoverFile(null);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage({ text: 'Title and content are required.', type: 'error' });
      return;
    }

    setIsSaving(true);
    setMessage({ text: 'Publishing...', type: 'info' });

    try {
      // Optional cover image: prefer an uploaded file, else use the URL field
      let cover_image = coverUrl.trim() || null;

      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `blog-covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio_files')
          .upload(filePath, coverFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('portfolio_files')
          .getPublicUrl(filePath);

        cover_image = publicUrlData.publicUrl;
      }

      const tagList = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const { error: dbError } = await supabase.from('blogs').insert([
        {
          title: title.trim(),
          slug: `${slugify(title)}-${Math.random().toString(36).substring(2, 7)}`,
          excerpt: excerpt.trim() || content.trim().slice(0, 160),
          content: content.trim(),
          cover_image,
          tags: tagList,
          reading_time: estimateReadingTime(content),
          published: true,
        },
      ]);

      if (dbError) throw dbError;

      setMessage({ text: 'Blog published successfully!', type: 'success' });
      resetForm();
      fetchBlogs();
      setTimeout(() => {
        setIsModalOpen(false);
        setMessage({ text: '', type: '' });
      }, 1500);
    } catch (error) {
      console.error('Publish error:', error);
      setMessage({ text: `Publish failed: ${error.message}`, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;
    try {
      // Remove the cover from storage if it was uploaded to our bucket
      if (blog.cover_image && blog.cover_image.includes('/portfolio_files/')) {
        const filePath = blog.cover_image.split('/portfolio_files/')[1];
        if (filePath) {
          await supabase.storage.from('portfolio_files').remove([filePath]);
        }
      }

      const { error } = await supabase.from('blogs').delete().eq('id', blog.id);
      if (error) throw error;
      fetchBlogs();
    } catch (error) {
      console.error('Delete error:', error.message);
      alert(
        'Failed to delete blog: ' +
          error.message +
          '\n\nIf this persists, run in the Supabase SQL Editor: alter table public.blogs disable row level security;'
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage({ text: '', type: '' });
  };

  return (
    <section className="admin section" id="blog-admin">
      <div className="container" style={{ marginBottom: '2rem' }}>
        <a
          href="#home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--title-color)',
            fontWeight: '500',
            gap: '0.5rem',
            transition: '0.3s',
          }}
          className="go-back-link"
        >
          <i className="uil uil-arrow-left" style={{ fontSize: '1.25rem' }}></i> Go Back to Home
        </a>
      </div>

      <div className="container">
        <h2 className="section__title">Blog Studio</h2>
        <span className="section__subtitle">Write &amp; manage your posts</span>

        {loadingBlogs ? (
          <p style={{ textAlign: 'center' }}>Loading blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="documents__grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="document__card">
                <div className="document__header">
                  <div className="document__icon">
                    <i className="uil uil-notes"></i>
                  </div>
                  <div>
                    <h4 className="document__title">{blog.title}</h4>
                    {blog.created_at && (
                      <span className="document__date">
                        {new Date(blog.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="document__actions">
                  <a
                    href="#blog"
                    className="button button--flex document__btn document__btn-view"
                  >
                    <i className="uil uil-eye"></i> View
                  </a>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleDelete(blog)}
                      className="button button--flex document__btn document__btn-delete"
                      type="button"
                    >
                      <i className="uil uil-trash-alt"></i> Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            No blogs yet. Click + to write your first post.
          </p>
        )}
      </div>

      <button className="fab__button" onClick={() => setIsModalOpen(true)} title="Write Blog">
        +
      </button>

      <div className={`modal__overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal__content">
          <i className="uil uil-times modal__close" onClick={closeModal}></i>

          {!isAuthenticated ? (
            <>
              <h3 className="section__title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Admin Access
              </h3>
              <form className="admin__form" onSubmit={handleLogin} style={{ boxShadow: 'none', padding: 0 }}>
                <div className="admin__form-div">
                  <label className="admin__form-tag">Passcode</label>
                  <input
                    type="password"
                    className="admin__form-input"
                    placeholder="Enter passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </div>
                {message.text && <p className={`admin__msg admin__msg-${message.type}`}>{message.text}</p>}
                <button type="submit" className="button button--flex" style={{ width: '100%', justifyContent: 'center' }}>
                  Login
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="section__title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Write a Blog
              </h3>
              <form className="admin__form" onSubmit={handlePublish} style={{ boxShadow: 'none', padding: 0 }}>
                <div className="admin__form-div">
                  <label className="admin__form-tag">Title</label>
                  <input
                    type="text"
                    className="admin__form-input"
                    placeholder="e.g. Understanding React Hooks"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="admin__form-div">
                  <label className="admin__form-tag">Excerpt (optional)</label>
                  <input
                    type="text"
                    className="admin__form-input"
                    placeholder="Short summary shown on the card"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>

                <div className="admin__form-div">
                  <label className="admin__form-tag">Content</label>
                  <textarea
                    className="admin__form-input"
                    placeholder="Write your blog here..."
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ resize: 'vertical', minHeight: '160px' }}
                  />
                </div>

                <div className="admin__form-div">
                  <label className="admin__form-tag">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="admin__form-input"
                    placeholder="react, javascript, frontend"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className="admin__form-div">
                  <label className="admin__form-tag">Cover image URL (optional)</label>
                  <input
                    type="text"
                    className="admin__form-input"
                    placeholder="https://..."
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                  />
                </div>

                <div className="admin__form-div">
                  <label className="admin__form-tag">…or upload a cover image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin__form-input"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                  />
                </div>

                {message.text && <p className={`admin__msg admin__msg-${message.type}`}>{message.text}</p>}

                <button
                  type="submit"
                  className="button button--flex"
                  disabled={isSaving}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isSaving ? 'Publishing...' : 'Publish Blog'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
