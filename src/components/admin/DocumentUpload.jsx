import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './admin.css';

export const DocumentUpload = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_documents')
        .select('*');
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error.message);
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !documentName) {
      setMessage({ text: 'Please provide a file and a name.', type: 'error' });
      return;
    }

    setIsUploading(true);
    setMessage({ text: 'Uploading...', type: 'info' });

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio_files')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from('portfolio_documents')
        .insert([{ name: documentName, url: publicUrl }]);

      if (dbError) throw dbError;

      setMessage({ text: 'Document uploaded successfully!', type: 'success' });
      setFile(null);
      setDocumentName('');
      fetchDocuments();
      setTimeout(() => {
         setIsModalOpen(false);
         setMessage({ text: '', type: '' });
      }, 1500);

    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ text: `Upload failed: ${error.message}`, type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`Are you sure you want to delete "${doc.name}"?`)) return;
    try {
      // 1. Delete from Storage bucket first
      try {
        // The URL typically looks like: .../storage/v1/object/public/portfolio_files/documents/filename.png
        // We need to extract the path after 'portfolio_files/'
        const urlParts = doc.url.split('/portfolio_files/');
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          const { error: storageError } = await supabase.storage
            .from('portfolio_files')
            .remove([filePath]);
            
          if (storageError) {
            console.warn('Could not delete file from storage (might already be deleted):', storageError.message);
          }
        }
      } catch (storageErr) {
        console.error('Storage deletion skipped/failed:', storageErr);
      }

      // 2. Delete from Database
      const { error: dbError } = await supabase
        .from('portfolio_documents')
        .delete()
        .eq('id', doc.id);
      
      if (dbError) throw dbError;
      
      fetchDocuments();
    } catch (error) {
      console.error('Delete error:', error.message);
      alert('Failed to delete document: ' + error.message + '\n\nIf this persists, you may need to go to your Supabase SQL Editor and run: alter table public.portfolio_documents disable row level security;');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage({ text: '', type: '' });
  };

  return (
    <section className="admin section" id="admin">
      {/* Go Back Link */}
      <div className="container" style={{ marginBottom: '2rem' }}>
         <a href="#home" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--title-color)', fontWeight: '500', gap: '0.5rem', transition: '0.3s' }} className="go-back-link">
           <i className="uil uil-arrow-left" style={{ fontSize: '1.25rem' }}></i> Go Back to Home
         </a>
      </div>

      <div className="container">
        <h2 className="section__title">Library</h2>
        <span className="section__subtitle">Explore the resources</span>

        {loadingDocs ? (
          <p style={{ textAlign: 'center' }}>Loading documents...</p>
        ) : documents.length > 0 ? (
          <div className="documents__grid">
            {documents.map((doc) => (
              <div key={doc.id} className="document__card">
                <div className="document__header">
                  <div className="document__icon">
                    <i className="uil uil-file-alt"></i>
                  </div>
                  <div>
                    <h4 className="document__title">{doc.name}</h4>
                    {doc.created_at && (
                      <span className="document__date">
                        {new Date(doc.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="document__actions">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="button button--flex document__btn document__btn-view">
                    <i className="uil uil-eye"></i> View
                  </a>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(doc.url);
                      alert('Link copied to clipboard!');
                    }}
                    className="button button--flex document__btn" 
                    style={{ background: 'var(--text-color)' }}
                    type="button"
                  >
                    <i className="uil uil-copy"></i> Copy
                  </button>
                  {isAuthenticated && (
                    <button 
                      onClick={() => handleDelete(doc)}
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
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>No documents found.</p>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fab__button" onClick={() => setIsModalOpen(true)} title="Upload Document">
        +
      </button>

      {/* Upload/Login Modal */}
      <div className={`modal__overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal__content">
          <i className="uil uil-times modal__close" onClick={closeModal}></i>

          {!isAuthenticated ? (
            <>
              <h3 className="section__title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Admin Access</h3>
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
                <button type="submit" className="button button--flex" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
              </form>
            </>
          ) : (
            <>
              <h3 className="section__title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Upload Document</h3>
              <form className="admin__form" onSubmit={handleUpload} style={{ boxShadow: 'none', padding: 0 }}>
                <div className="admin__form-div">
                  <label className="admin__form-tag">Document Name</label>
                  <input
                    type="text"
                    className="admin__form-input"
                    placeholder="e.g. My Resume 2026"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                  />
                </div>

                <div className="admin__form-div">
                  <label className="admin__form-tag">File</label>
                  <input
                    type="file"
                    className="admin__form-input"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                {message.text && <p className={`admin__msg admin__msg-${message.type}`}>{message.text}</p>}

                <button type="submit" className="button button--flex" disabled={isUploading} style={{ width: '100%', justifyContent: 'center' }}>
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
