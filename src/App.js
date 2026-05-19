
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

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light-theme';
    });
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

    return (
        <>
            <Background />
            <Header theme={theme} toggleTheme={toggleTheme} />
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
        </>
    );
}

export default App;
