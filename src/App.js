
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import { Home } from './components/Home/Home';
import { About } from './components/about/About';
import { Skills } from './components/skills/Skills';
import { Services } from './components/services/Services';
import { Qualification } from './components/qualification/Qualification';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';
import { ScrollUp } from './components/scrollup/ScrollUp';
import { Work } from './components/work/Work';
import React, { useEffect, useState } from 'react';


function App() {

const [theme, setTheme] = useState('light-theme');
const toggleTheme = () => {
  setTheme((prevTheme)  => (prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme')); 
};
useEffect(() =>{
  document.body.className = theme;
}, [theme]);

  return (
    <>
    <Header theme={theme} toggleTheme={toggleTheme}/>
    <main className='main'>
      <Home />
     <About />
     <Skills />
     <Services />
     <Qualification />
     <Work />
     <Contact />
    
    </main>

    <Footer />
    <ScrollUp />
    </>
  );
}

export default App;
