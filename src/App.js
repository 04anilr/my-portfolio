
import './App.css';
import Header from './components/header/Header';
import { Home } from './components/Home/Home';
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
import React, { useEffect, useState } from 'react';
import Background from './components/background/Background';
import { ProfileDrawer } from './components/profile/ProfileDrawer';

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light-theme';
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
            <Header theme={theme} toggleTheme={toggleTheme} onProfileClick={() => setIsProfileOpen(true)} />
            <main className='main'>
                <Home />
                <Verification />
                <About />
                <Skills />
                <Services />
                <Qualification />
                <Work />
                <Project />
                <Blog />
                <Contact />
            </main>
            <Footer />
            <ScrollUp />
            <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </>
    );
}

export default App;
