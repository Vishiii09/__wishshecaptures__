import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import ContactFooter from './components/ContactFooter';

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Gallery />
            </main>
            <ContactFooter />
        </>
    );
}

export default App;
