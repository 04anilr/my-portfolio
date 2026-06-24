
import './App.css';
import Header from './components/header/Header';
import { Home } from './components/Home/Home';
import { BannerSlider } from './components/banner/BannerSlider';
import Verification from './components/verification/Verification';
import { About } from './components/about/About';
import { Skills } from './components/skills/Skills';
import { Services } from './components/services/Services';
import { Qualification } from './components/qualification/Qualification';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';
import { ScrollUp } from './components/scrollup/ScrollUp';
import { Work } from './components/work/Work';
import { Project } from './components/project/Project';
import { Blog } from './components/blog/Blog';
import { JsTutorial } from './components/jstutorial/JsTutorial';
import { JsPlaygroundCta } from './components/jstutorial/JsPlaygroundCta';
import { AboutPage } from './components/about/AboutPage';
import { Chatbot } from './components/chatbot/Chatbot';
import React, { useEffect, useState } from 'react';
import Background from './components/background/Background';
import { ProfileDrawer } from './components/profile/ProfileDrawer';
import { Hud } from './components/hud/Hud';
import { DocumentUpload } from './components/admin/DocumentUpload';
import { useScrollReveal } from './lib/useScrollReveal';

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light-theme';
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => {
        const hash = window.location.hash;
        if (hash === '#/playground') return 'playground';
        if (hash === '#/about') return 'about';
        if (hash === '#/admin') return 'admin';
        return 'home';
    });

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#/playground') {
                setCurrentPage('playground');
                window.scrollTo(0, 0);
            } else if (hash === '#/about') {
                setCurrentPage('about');
                window.scrollTo(0, 0);
            } else if (hash === '#/admin') {
                setCurrentPage('admin');
                window.scrollTo(0, 0);
            } else {
                setCurrentPage('home');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    // Scroll-reveal animations across the whole portfolio
    useScrollReveal();

    // Load saved color accent hue on mount
    useEffect(() => {
        const savedHue = localStorage.getItem('theme-hue');
        if (savedHue) {
            document.documentElement.style.setProperty('--hue', savedHue);
        }
    }, []);

    return (
        <>
            <Background />
            {currentPage === 'home' && (
                <Header theme={theme} toggleTheme={toggleTheme} onProfileClick={() => setIsProfileOpen(true)} />
            )}

            {currentPage === 'home' ? (
                <main className='main'>
                    <BannerSlider />
                    <Home />
                    <Verification />
                    <About />
                    <Skills />
                    <Services />
                    <Qualification />
                    <Work />
                    <Project />
                    <Blog />
                    <JsPlaygroundCta />
                    <Contact />
                </main>
            ) : currentPage === 'playground' ? (
                <main className='main standalone-playground-page'>
                    <JsTutorial />
                </main>
            ) : currentPage === 'admin' ? (
                <main className='main standalone-admin-page'>
                    <DocumentUpload />
                </main>
            ) : (
                <main className='main standalone-about-page'>
                    <AboutPage />
                </main>
            )}

            {currentPage === 'home' && <Footer />}
            <ScrollUp />
            <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <Hud />
            <Chatbot />
        </>
    );
}

export default App;
